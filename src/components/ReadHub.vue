<template>
  <n-list hoverable clickable>
    <n-list-item :key="item.uid" v-for="(item,index) in news" align="left" @click.stop="()=>showContent(item)">
      <template #prefix>
        <n-space justify="center" align="center">
          <n-tag type="primary" round size="small">
            {{ index + 1 }}
          </n-tag>
        </n-space>
      </template>
      <n-space vertical>
        <n-space justify="start" vertical>
          <n-tag type="info" size="small" class="cursor-pointer">{{ toDateTimeStr(item['createdAt']) }}</n-tag>
          <n-text class="cursor-pointer">{{ item['title'] }}</n-text>
        </n-space>
      </n-space>
      <template #suffix>
        <n-space>
          <n-button title="浏览器打开" :focusable="false" size="small" ghost
                    @click.stop="()=>openOriginLink(item['uid'])">
            <n-icon :component="OpenInBrowserRound"/>
          </n-button>
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

export default {
  name: "ReadHub",
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
      axios.get('https://api.readhub.cn/topic/list?size=50')
          .then(res => {
            const {items} = res.data.data
            news.value = items || []
          })
          .finally(() => ctx.emit('update:loading', false))
    }
    const detailDrawer = ref()
    const showContent = (item) => {
      detailDrawer.value.show({title: item['title'], content: item['summary']})
    }

    const openOriginLink = (uid) => utools.shellOpenExternal(`https://readhub.cn/topic/${uid}`)

    onMounted(reload)

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
