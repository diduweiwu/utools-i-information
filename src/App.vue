<script>
import {darkTheme, useOsTheme} from "naive-ui";
import {computed, ref} from "vue";
import ReadHub from "./components/ReadHub.vue";
import WeiboHot from "./components/WeiboHot.vue";
import {fetchConfig, fetchSources, updateConfig} from "./js/useConfig.js";
import {emitter, REFRESH_EVENT} from "./js/useEvent.js";
import {InfoOutlined, RefreshSharp} from "@vicons/material";
import About from "./components/about/About.vue";
import CommonNews from "./components/CommonNews.vue";
import axios from "axios";
import OpenSourceNews from "./components/OpenSourceNews.vue";
import OpenSourceSoftwareUpdateNews from "./components/OpenSourceSoftwareUpdateNews.vue";
import BiliBiliHot from "./components/BiliBiliHot.vue";


export default {
  methods: {axios},
  components: {BiliBiliHot, OpenSourceSoftwareUpdateNews, OpenSourceNews, CommonNews, About, WeiboHot, ReadHub},
  setup() {
    const osThemeRef = useOsTheme();
    const loading = ref(false)
    const sources = fetchSources()
    const config = ref(fetchConfig())

    const switchSource = (source) => {
      config.value['source'] = source
      updateConfig(config.value)
    }

    const triggerUpdate = () => emitter.emit(REFRESH_EVENT)


    return {
      loading,
      config,
      sources,
      switchSource,
      triggerUpdate,
      RefreshSharp, InfoOutlined,
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
            <n-space>
              <n-tag :key="source['name']" v-for="source in sources" checkable @click='()=>switchSource(source)'
                     :checked="source['name']===config.source?.name">{{ source['title'] }}
              </n-tag>
            </n-space>
            <n-space>
              <n-button title="刷新" :disabled="loading" :focusable="false" text @click="triggerUpdate">
                <n-icon size="20px" :component="RefreshSharp"/>
              </n-button>

              <n-button title="关于" :disabled="loading" :focusable="false" text @click="()=>$refs.about.show()">
                <n-icon size="20px" :component="InfoOutlined"/>
              </n-button>

            </n-space>
          </n-space>
        </n-layout-header>
        <n-layout has-sider position="absolute" style="top: 60px">
          <n-layout content-style="padding: 5px 10px;" :native-scrollbar="false">
            <About ref="about"/>
            <n-spin :show="loading" description="努力加载中~" style="min-height: 300px">
              <BiliBiliHot v-if="config.source?.name==='bilibiliHot'" v-model:loading="loading"/>
              <ReadHub v-if="config.source?.name==='readhub'" v-model:loading="loading"/>
              <OpenSourceNews v-if="config.source?.name==='opensourceNews'" v-model:loading="loading"/>
              <OpenSourceSoftwareUpdateNews v-if="config.source?.name==='opensourceSoftwareUpdateNews'" v-model:loading="loading"/>
              <WeiboHot v-if="config.source?.name==='weibohot'" v-model:loading="loading"/>
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
