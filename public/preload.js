const mitt = require('mitt')

/**
 * 全局函数(preload种可以调用electron/node函数)
 */
window.mitt = mitt()
