<template>
  <n-list hoverable clickable>
    <n-list-item :key="item.title" v-for="(item,index) in news" align="left"
                 @click.stop="()=>openOriginLink(item['link'])">
      <template #prefix>
        <n-space justify="center" align="center">
          <n-tag type="default" round size="small">
            {{ index + 1 }}
          </n-tag>
        </n-space>
      </template>
      <n-space vertical>
        <n-space justify="start" vertical>
          <div>
            <n-text class="cursor-pointer">{{ item['title'] }}</n-text>
          </div>
        </n-space>
      </n-space>
      <template #suffix>

      </template>
    </n-list-item>
  </n-list>
  <DetailDrawer ref="detailDrawer"/>
</template>

<script>
import {onMounted, ref} from "vue";
import {toDateTimeStr} from "../js/useDate.js";
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
    const reload = () => {
      if (!newsApi) {
        return error('未配置新闻源')
      }

      ctx.emit('update:loading', true)

      news.value = []
      newsApi().then(res => news.value = newsExtractor(res))
          .catch(e => alert(e))
          .finally(() => ctx.emit('update:loading', false))
    }
    const detailDrawer = ref()
    const showContent = (item) => {
      detailDrawer.value.show({title: item['title'], content: item['summary']})
    }

    const openOriginLink = (link) => utools.shellOpenExternal(link)

    onMounted(() => {
      reload()
      emitter.on(REFRESH_EVENT, reload)
    })

    return {
      news,
      toDateTimeStr,
      detailDrawer,
      showContent,
      DetailDrawer,
      openOriginLink,
      OpenInBrowserRound,
    }
  }
}
</script>

<style scoped>

</style>
