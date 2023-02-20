import {ref} from "vue";

function fetchConfig() {
}

export default function () {
    const config = ref({
        source: {
            title: '微博热搜',
            name: 'weibohot',
        },
    })
    const sources = ref(
        [
            {
                title: '微博热搜',
                name: 'weibohot',
            },
            {
                title: 'ReadHub',
                name: 'readhub',
            },
        ]
    )

    return {
        sources,
        config,
    }
}
