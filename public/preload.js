const https = require("https");

/**
 * 全局函数(preload种可以调用electron/node函数)
 */
window.fetchJsonHttps = (host, path, config = {}) => new Promise((resolve) => {
        https.get({host, path, headers: config['headers'] || {},}
            , res => {
                let rawData = '';
                res.on('data', chunk => rawData += chunk);

                res.on('end', () => {
                    try {
                        const parsedData = JSON.parse(rawData);
                        resolve(parsedData)
                    } catch (e) {
                        alert(`出错了: ${e.message}`
                        );
                    }
                }).on("error", (err) => alert(
                    `出错了: ${err.message}`
                ));
            })
    }
)


const fetchHost = (url) => {
    // 默认组装Referer header头
    let domainType = ".cn"
    if (url.indexOf(".com") > -1) {
        domainType = ".com"
    }

    const [host, path] = url.split(domainType)
    return {
        host: `${host}${domainType}`
        , path
    }
}

function fetchSuffix(url) {
    const urlSegments = url.split(".")
    let fileSuffix = urlSegments[urlSegments.length - 1]
    if (fileSuffix !== 'gif') {
        fileSuffix = 'jpg'
    }

    return fileSuffix
}

const fetchFile = (url, filePath, config) => {
    const {host, path} = fetchHost(url)
    const request = url.startsWith('https') ? https : http

    return new Promise(resolve => request.get({
        host:

            `${host.replace('https://', '').replace('http://', '')}`

        ,
        path: path,
        method: 'get',
        headers: config['headers'] || {}
    }, res => {
        res.pipe(fs.createWriteStream(filePath))
            .on('close', () => resolve(filePath))
    }))
}
const getFileSize = (filePath) => {
    return new Promise((resolve) => {
        if (!filePath) {
            resolve(0);
            return;
        }

        fs.stat(filePath, (err, data) => {
            if (err == null) {
                resolve(data.size);
                return;
            }
            resolve(0);
        });
    });
}

window.composeFilePath = (url) => {
    // 文件名采用随机方式，避免文件冲突
    let fileName =

        `${crypto.createHash('md5').update(url).digest('hex')}`


    let fileSuffix = fetchSuffix(url)
    // 组装文件路径,需要将文件后缀拼接上
    return

    `${utools.getPath("temp")}/${fileName}.${fileSuffix}`


}

window.downloadImage = async (url, config = {}) => {
    // 默认组装Referer header头
    const {host} = fetchHost(url)
    config = Object.assign({'headers': {'Referer': host}, ...config})

    // 组装文件路径,需要将文件后缀拼接上
    const filePath = composeFilePath(url)
    if (!fs.existsSync(filePath)) {
        await fetchFile(url, filePath, config)
    }

    // 二次检查，文件存在且不符合要求则删除掉
    if (fs.existsSync(filePath)) {
        const fileSize = await getFileSize(filePath)

        // 不存在的文件或者小于1k的图表，删除缓存并跳过
        if (fileSize < 1024) {
            fs.unlinkSync(filePath)
            return null
        }
    }

    return {
        imgSrc: url,
        fileSrc:

            `file://${filePath}`,
    }
}
