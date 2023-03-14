<template>
  <n-drawer v-model:show="isShow" placement="left" style="width: 90%">
    <n-drawer-content :title="newsDetail.title">
      <n-spin description="努力加载中~" :show="isLoading">
        <div v-html="newsDetail.content" class="content"></div>
      </n-spin>
    </n-drawer-content>
  </n-drawer>
</template>

<script>
import {ref} from "vue";

export default {
  name: "DetailDrawer",
  setup() {
    const isShow = ref(false)
    const isLoading = ref(false)
    const newsDetail = ref({title: '', content: '',})

    const show = (apiCall) => {
      isLoading.value = true
      apiCall().then(({title, content}) => {
        Object.assign(newsDetail.value, {title: title || '详情', content})
        isShow.value = true
      }).finally(() => isLoading.value = false)
    }

    return {
      isShow,
      isLoading,
      newsDetail,
      show,
    }
  }
}
</script>

<style>
.content img {
  max-width: 100%;
}
</style>
