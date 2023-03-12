<template>
  <CommonNews :news-api="fetchNews" :news-extractor="newsExtractor">
    <template #suffix="{item}">
      <n-tag v-if="item['icon_desc']" type="info" size="small"
             :color="{textColor:'#ffffff',color:item['icon_desc_color']}">
        {{ item['icon_desc'] }}
      </n-tag>
    </template>
  </CommonNews>
</template>

<script>
import axios from "axios";
import DetailDrawer from "/src/components/DetailDrawer.vue";
import CommonNews from "/src/components/CommonNews.vue";
import {OpenInBrowserRound} from "@vicons/material";

export default {
  name: "WeiboHot",
  components: {DetailDrawer, CommonNews, OpenInBrowserRound},
  props: {
    loading: {type: Boolean, default: false},
  },
  emits: ['update:loading'],
  setup(props, ctx) {
    // https://api.readhub.cn/topic/list?size=50
    const fetchNews = () => axios.get('https://weibo.com/ajax/side/hotSearch')

    const newsExtractor = (body) => {
      const {realtime: items} = body.data.data

      return (items || []).filter(n => !!n['word_scheme'])
          .map(item => ({
            icon_desc: item['icon_desc'],
            icon_desc_color: item['icon_desc_color'],
            title: item['note'],
            summary: item['summary'],
            link: `https://s.weibo.com/weibo?q=${encodeURIComponent(item['word_scheme'])}`
          }))
    }

    return {
      OpenInBrowserRound,
      fetchNews,
      newsExtractor,
    }
  }
}
</script>

<style scoped>

</style>
