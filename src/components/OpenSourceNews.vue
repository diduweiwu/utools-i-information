<template>
  <CommonNews :news-api="fetchNews" :news-extractor="extractNews"/>
</template>

<script>
import CommonNews from "/src/components/CommonNews.vue";
import axios from "axios";
import cheerio from "cheerio";

export default {
  name: "OpenSourceNews",
  components: {CommonNews},
  setup() {
    return {
      fetchNews: () => axios.get('https://www.oschina.net/news/industry'),
      extractNews: (res) => {
        const $ = cheerio.load(res.data)
        const newsLinks = $('#right-box > div.section.articles-list > div > div > div.content > a')
        return newsLinks.map((_, news) => ({title: $(news).text(), link: news.attribs['href']}))

      }
    }
  }
}
</script>

<style scoped>

</style>
