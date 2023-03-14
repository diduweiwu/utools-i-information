import {createApp} from 'vue'
import './style.css'
import App from './App.vue'
import '/src/css/App.css'
import {
    create,
    NButton,
    NConfigProvider,
    NDrawer,
    NDrawerContent,
    NEllipsis,
    NLayout,
    NLayoutHeader,
    NList,
    NListItem,
    NMessageProvider,
    NSpace,
    NAlert,
    NSpin,
    NTag,
    NText,
    NIcon,
    NResult,
    NDivider,
} from 'naive-ui'

const naive = create({
    components: [
        NButton,
        NConfigProvider,
        NLayout,
        NLayoutHeader,
        NList,
        NListItem,
        NMessageProvider,
        NSpace,
        NAlert,
        NSpin,
        NTag,
        NText,
        NIcon,
        NResult,
        NDivider,
        NEllipsis,
        NDrawer,
        NDrawerContent,
    ]
})
createApp(App).use(naive).mount('#app')
