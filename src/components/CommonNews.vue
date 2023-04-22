<template>
  <n-list hoverable clickable>
    <n-list-item :key="item.title" v-for="(item,index) in news" style="text-align: left"
                 @click.stop="()=>openOriginLink(item['link'])">
      <template #prefix>
        <n-space  style="width: 25px" justify="center">
          <slot name="prefix" :item="item" :index="index">
            <n-text :type="index<=2?'error':'warning'" strong style="font-size: 25px">
              {{ index + 1 }}
            </n-text>
          </slot>
        </n-space>
      </template>

      <n-space vertical>
        <n-space justify="start" align="center">
          <slot name="img">
            <img v-if="item['imgSrc']" width="100" :src="imgMap[item['imgSrc']]">
          </slot>
          <n-space vertical>
            <n-text strong style="font-size: 17px" class="cursor-pointer">{{ item['title'] }}</n-text>
            <slot name="title_extra" :item="item"/>
          </n-space>
        </n-space>
        <slot name="content_extra" :item="item"/>
      </n-space>
      <template #suffix>
        <div style="max-width: 100px">
          <slot name="suffix" :item="item"/>
        </div>
      </template>
    </n-list-item>
  </n-list>
</template>

<script>
import {onMounted, ref} from "vue";
import DetailDrawer from "/src/components/DetailDrawer.vue";
import {OpenInBrowserRound} from "@vicons/material";
import {emitter, REFRESH_EVENT} from "../js/useEvent.js";
import {useMessage} from "naive-ui";

export default {
  name: "CommonNews",
  components: {DetailDrawer, OpenInBrowserRound},
  props: {
    loading: {type: Boolean, default: false},
    newsApi: {type: Function, default: null},
    newsExtractor: {type: Function, default: null},
  },
  emits: ['update:loading'],
  setup(props, ctx) {
    // https://api.readhub.cn/topic/list?size=50
    const news = ref([])
    const {newsApi, newsExtractor} = props
    const {error} = useMessage()

    const imgMap = ref({})

    const reload = () => {
      if (!newsApi) {
        return error('未配置新闻源')
      }

      ctx.emit('update:loading', true)

      news.value = []
      imgMap.value = {}

      newsApi().then(res => {
        news.value = newsExtractor(res)
        for (let i = 0; i < news.value.length; i++) {
          const imgSrc = news.value[i]['imgSrc']
          if (!imgSrc) {
            continue
          }
          downloadImage(imgSrc).then(result => imgMap.value[imgSrc] = result['fileSrc'])
        }
      })
          .catch(e => alert(e))
          .finally(() => ctx.emit('update:loading', false))
    }

    const openOriginLink = (link) => utools.shellOpenExternal(link)

    onMounted(() => {
      reload()
      emitter.on(REFRESH_EVENT, reload)
    })

    return {
      news,
      DetailDrawer,
      openOriginLink,
      OpenInBrowserRound,
      imgMap,
    }
  }
}
</script>

<style scoped>

</style>
