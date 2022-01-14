/**
 * README !
 * 使用了插件 vue-fullscreen
 * npm i vue-fullscreen -D
 *
 * 全局或局部注册
 * import fullscreen from 'vue-fullscreen'
 * Vue.use(fullscreen)
 *
 * 这里封装了几个函数可以使用
 * 官方文档地址：
 * https://mirari.cc/2017/08/14/全屏切换组件vue-fullscreen/
 *
 * 使用注意：
 * listners(keyObj => {
 *  fullScreenEvent(keyObj)
 * })
 *
 * fullScreenEvent (keyObj) {
 *    // 在非全屏状态escape报错
 *    if (!this.isFullScreen && keyObj === 'Escape') {
 *      return false
 *    }
 *    fullScreenToogle(this, '#app', e => {
 *      this.isFullScreen = e
 *    })
 * }
 *
 * */

 /**
  * 监听按钮按下
  * 回调函数返回按钮事件对象， 获取其中的key属性判断， 例如 'Escape'， 'F11'
  * **/
function listners (callback) {
  document.onkeydown = keyObj => {
    switch (keyObj.key) {
      case 'Escape':
      case 'F11':
        keyObj.preventDefault()
        break
    }

    callback && callback(keyObj)
  }
}


/**
 * 由于fullscreen挂在vue上
 * 素以参数去要传递vue
 * **/
function fullScreenToogle (vue, dom, callback) {
  vue.$fullscreen.toggle(document.querySelector(dom), {
    wrap: false,
    callback
  })
}

function fullScreenEnter (vue, dom, callback) {
  vue.$fullscreen.enter(document.querySelector(dom), callback)
}

function fullScreenExit (vue) {
  vue.$fullscreen.exit()
}

export {
  listners,
  fullScreenToogle,
  fullScreenEnter,
  fullScreenExit
}
