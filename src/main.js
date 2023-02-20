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
    NSpin,
    NTag,
    NText,
    NIcon,
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
        NSpin,
        NTag,
        NText,
        NIcon,
        NEllipsis,
        NDrawer,
        NDrawerContent,
    ]
})
createApp(App).use(naive).mount('#app')
