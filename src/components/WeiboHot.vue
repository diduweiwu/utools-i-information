<template>
  <n-list hoverable clickable>
    <n-list-item :key="item.uid" v-for="(item,index) in news" align="left"
                 @click.stop="()=>openOriginLink(item['word_scheme'])">
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
            <n-text class="cursor-pointer">{{ item['word'] }}</n-text>
          </div>
        </n-space>
      </n-space>
      <template #suffix>
        <n-space>
          <n-tag v-if="item['icon_desc']" type="info" size="small"
                 :color="{textColor:'#ffffff',color:item['icon_desc_color']}">
            {{ item['icon_desc'] }}
          </n-tag>
        </n-space>
      </template>
    </n-list-item>
  </n-list>
  <DetailDrawer ref="detailDrawer"/>
</template>

<script>
import {onMounted, ref} from "vue";
import axios from "axios";
import {toDateTimeStr} from "../js/useDate.js";
import DetailDrawer from "/src/components/DetailDrawer.vue";
import {OpenInBrowserRound} from "@vicons/material";
import nzh from "nzh/cn";
import {REFRESH_EVENT} from "../js/useEvent.js";

export default {
  name: "WeiboHot",
  components: {DetailDrawer, OpenInBrowserRound},
  props: {
    loading: {type: Boolean, default: false},
  },
  emits: ['update:loading'],
  setup(props, ctx) {
    // https://api.readhub.cn/topic/list?size=50
    const news = ref([])
    const reload = () => {
      ctx.emit('update:loading', true)
      axios.get('https://weibo.com/ajax/side/hotSearch')
          .then(res => {
            const {realtime: items} = res.data.data
            news.value = items || []
          })
          .finally(() => ctx.emit('update:loading', false))
    }
    const detailDrawer = ref()
    const showContent = (item) => {
      detailDrawer.value.show({title: item['title'], content: item['summary']})
    }

    const openOriginLink = (wordScheme) => utools.shellOpenExternal(`https://s.weibo.com/weibo?q=${encodeURIComponent(wordScheme)}`)

    onMounted(() => {
      reload()
      mitt.on(REFRESH_EVENT, reload)
    })

    return {
      news,
      toDateTimeStr,
      detailDrawer,
      showContent,
      DetailDrawer,
      openOriginLink,
      OpenInBrowserRound,
      nzh,
    }
  }
}
</script>

<style scoped>

</style>
