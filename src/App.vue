<script>
import {darkTheme, useOsTheme} from "naive-ui";
import {computed, ref} from "vue";
import ReadHub from "./components/ReadHub.vue";
import WeiboHot from "./components/WeiboHot.vue";
import UseConfig from "./js/useConfig.js";

export default {
  components: {WeiboHot, ReadHub},
  setup() {
    const osThemeRef = useOsTheme();
    const loading = ref(false)
    const {config} = UseConfig()
    return {
      loading,
      config,
      theme: computed(() => osThemeRef.value === "dark" ? darkTheme : null),
    }
  }
}
</script>

<template>
  <n-config-provider :theme="theme">
    <n-message-provider placement="top" container-style="margin-top:50px" :duration="1500" closable>
      <n-layout position="absolute">
        <n-layout-header style="height: 50px;" bordered>
          <n-space justify="space-between" align="center" style="height: 50px;padding:0 10px">
            <n-tag checked checkable>{{ config['source']['title'] }}</n-tag>
          </n-space>
        </n-layout-header>
        <n-layout has-sider position="absolute" style="top: 60px">
          <n-layout content-style="padding: 5px 10px;" :native-scrollbar="false">
            <n-spin :show="loading" style="min-height: 300px">
              <ReadHub v-if="config['source']['name']==='readhub'" v-model:loading="loading"/>
              <WeiboHot v-if="config['source']['name']==='weibohot'" v-model:loading="loading"/>
            </n-spin>
          </n-layout>
        </n-layout>
      </n-layout>
    </n-message-provider>
  </n-config-provider>

</template>

<style scoped>

</style>

<style>

</style>
