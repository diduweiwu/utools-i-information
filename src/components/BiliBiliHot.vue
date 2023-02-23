<template>
  <CommonNews :news-api="fetchNews" :news-extractor="newsExtractor"/>
</template>

<script>
import CommonNews from "/src/components/CommonNews.vue";

export default {
  name: "BiliBiliHot",
  components: {CommonNews},
  setup() {
    const fetchNews = () => fetchJsonHttps('api.bilibili.com', '/x/web-interface/popular?ps=50&pn=1',
        {
          headers: {
            "cookie": 'innersign=0; buvid3=7DA684E5-E427-0B67-F83E-9438F1665BAB11396infoc; b_nut=1677122611; b_lsid=F9ABC3C4_1867C4C29EE; _uuid=71648E92-105F7-9398-28FD-EB83BBFEFEC611698infoc; buvid_fp=be223f02326b7be8d2a38c916e0f5136; buvid4=C3F9A99A-865A-E332-9929-A3B315C7D0F112183-023022311-HX/ocDiryzwZljVBkuRhuw%3D%3D'
          }
        },
    )
    const newsExtractor = (body) => {
      const lists = body.data?.list || []
      return lists.map(news => ({
        title: news['title'],
        link: news['short_link']
      }))
    }
    return {
      fetchNews,
      newsExtractor,
    }
  }
}
</script>

<style scoped>

</style>
