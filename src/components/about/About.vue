<template>
  <n-drawer v-model:show="isShow" style="width: 90%" placement="left">
    <n-drawer-content>
      <n-result status="404" title="这里只是一个兴趣使然的开发者" description="生活总归需要点乐趣">
        <template #footer>
          <n-list>
            <n-list-item>欢迎大家使用和反馈~</n-list-item>
            <n-list-item>源码地址: <a :href="sourceLink" @click="openSourceLink">{{ sourceLink }}</a>
            </n-list-item>
          </n-list>
        </template>
      </n-result>
    </n-drawer-content>
  </n-drawer>

</template>

<script>
import {ref} from "vue";

export default {
  name: "About",
  setup() {
    const isShow = ref(false)
    const sourceLink = "https://github.com/diduweiwu/utools-i-information"

    const openSourceLink = () => utools.shellOpenExternal(sourceLink)
    return {
      isShow,
      sourceLink,
      openSourceLink,
      show: () => isShow.value = true,
    }
  }
}
</script>

<style scoped>

</style>
