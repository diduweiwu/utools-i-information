<template>
  <CommonNews :news-api="fetchNews" :news-extractor="extractNews"/>
</template>

<script>
import CommonNews from "/src/components/CommonNews.vue";
import axios from "axios";
import cheerio from "cheerio";

export default {
  name: "OpenSourceSoftwareUpdateNews",
  components: {CommonNews},
  setup() {
    return {
      fetchNews: () => axios.get('https://www.oschina.net/news/project'),
      extractNews: (res) => {
        const $ = cheerio.load(res.data)
        const newsLinks = $('.news-item-hover')

        return newsLinks.map((_, news) => {

              const imgAttribs = $(news).find('img')[0]?.attribs || {}
              return {
                title: $(news).find('.title').text(),
                imgSrc: imgAttribs['data-src'],
                link: news.attribs['data-url']
              }
            }
        )
      }
    }
  }
}
</script>

<style scoped>

</style>
