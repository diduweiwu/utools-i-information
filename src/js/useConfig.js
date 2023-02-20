export function fetchConfig() {
    return utools.dbStorage.getItem('config') || {
        source: {
            title: '微博热搜',
            name: 'weibohot',
        }
    }
}

export function updateConfig(config) {
    return utools.dbStorage.setItem('config', JSON.parse(JSON.stringify(config)))
}

export function fetchSources() {
    return [
        {
            title: '微博热搜',
            name: 'weibohot',
        },
        {
            title: 'ReadHub',
            name: 'readhub',
        }
    ]
}

