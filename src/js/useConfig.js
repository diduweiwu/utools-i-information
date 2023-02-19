import {ref} from "vue";

function fetchConfig(){
}

export default function () {
    const config = ref({
        source: {
            name: ''
        },
    })
    const sources = ref()

    return {
        sources,
        config,
    }
}
