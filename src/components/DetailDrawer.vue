<template>
  <n-drawer v-model:show="isShow" placement="left" style="width: 80%">
    <n-drawer-content :title="newsDetail.title">
      <div v-html="newsDetail.content" style="text-indent: 2em"></div>
    </n-drawer-content>
  </n-drawer>
</template>

<script>
import {ref} from "vue";

export default {
  name: "DetailDrawer",
  setup() {
    const isShow = ref(false)
    const newsDetail = ref({
      title: '',
      content: '',
    })

    const show = ({title, content}) => {
      isShow.value = true
      Object.assign(newsDetail.value, {title: title || '详细', content})
    }

    return {
      isShow,
      newsDetail,
      show,
    }
  }
}
</script>

<style scoped>

</style>
