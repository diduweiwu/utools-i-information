<template>
  <n-list hoverable clickable>
    <n-list-item :key="item.uid" v-for="(item,index) in news" align="left" @click="()=>showContent(item)">
      <template #prefix>
        <n-space justify="center">
          <n-tag type="primary" size="small">
            {{ toDateTimeStr(item['createdAt']) }}
          </n-tag>
        </n-space>
      </template>
      <n-space vertical>
        <n-space justify="start">
          <n-text class="cursor-pointer">{{ item['title'] }}</n-text>
        </n-space>
      </n-space>
      <template #suffix>
        <n-space>
          <n-button size="tiny" @click.stop="()=>openOriginLink(item['uid'])">详情</n-button>
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

export default {
  name: "ReadHub",
  components: {DetailDrawer},
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
    }
  }
}
</script>

<style scoped>

</style>
