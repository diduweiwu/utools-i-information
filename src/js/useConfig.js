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
        }, {
            title: 'B站热门',
            name: 'bilibiliHot',
        },
        {
            title: 'ReadHub',
            name: 'readhub',
        },
        {
            title: '开源资讯',
            name: 'opensourceNews',
        },
        {
            title: '软件资讯',
            name: 'opensourceSoftwareUpdateNews',
        }
    ]
}

