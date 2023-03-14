<template>
  <CommonNews :news-api="fetchNews" :news-extractor="newsExtractor">
    <template #content_extra="{item}">
      <n-text>
        {{ toDateTimeStr(item['createdAt']) }}
      </n-text>
    </template>
    <template #suffix="{item}">
      <n-button :focusable="false" round @click.stop="()=>showContent(item)" ghost>
        详情
      </n-button>
    </template>
  </CommonNews>
  <DetailDrawer ref="detailDrawer"/>
</template>

<script>
import {ref} from "vue";
import axios from "axios";
import {toDateTimeStr} from "../js/useDate.js";
import DetailDrawer from "/src/components/DetailDrawer.vue";
import CommonNews from "/src/components/CommonNews.vue";
import {OpenInBrowserRound} from "@vicons/material";

export default {
  name: "ReadHub",
  components: {DetailDrawer, CommonNews, OpenInBrowserRound},
  props: {
    loading: {type: Boolean, default: false},
  },
  emits: ['update:loading'],
  setup(props, ctx) {
    // https://api.readhub.cn/topic/list?size=50
    const fetchNews = () => axios.get('https://api.readhub.cn/topic/list?size=50')
    const newsExtractor = (body) => {
      const {items} = body.data.data

      return (items || []).map(item => ({
        uid: item['uid'],
        title: item['title'],
        summary: item['summary'],
        createdAt: item['createdAt'],
        link: `https://readhub.cn/topic/${item['uid']}`
      }))
    }

    const detailDrawer = ref()
    const showContent = (item) => {
      // https://api.readhub.cn/topic/instantview?topicId=8o8ZpsUbcSh
      const {uid} = item
      detailDrawer.value.show(() => axios.get(`https://api.readhub.cn/topic/instantview?topicId=${uid}`)
          .then(res => {
            const {title, content} = res.data
            return {title, content}
          })
      )
    }

    return {
      fetchNews,
      newsExtractor,
      toDateTimeStr,
      detailDrawer,
      showContent,
      DetailDrawer,
      OpenInBrowserRound,
    }
  }
}
</script>

<style scoped>

</style>
