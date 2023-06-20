<template>
  <CommonNews :news-api="fetchNews" :news-extractor="extractNews">
    <template #title_extra="{item}">
      <n-space vertical>
        <div>{{ item['summary'] }}</div>
        <n-tag>{{ item['extra'] }}</n-tag>
      </n-space>
    </template>
  </CommonNews>
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
        const newsLinks = $('.news-item-hover')
        return newsLinks.map((_, news) => ({
              title: $(news).find('.title').text(),
              link: news.attribs['data-url'],
              summary:$(news).find('.line-clamp').text(),
              extra:$(news).find('.extra .item:eq(0)').text(),
            }
        ))

      }
    }
  }
}
</script>

<style scoped>

</style>
