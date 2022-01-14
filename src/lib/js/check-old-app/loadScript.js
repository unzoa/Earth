/* eslint-disable*/

export default (src, cb) => {
  let script = document.createElement('script')
  script.src = `${src}?time=${new Date().getTime()}` // 加参数：防止浏览器缓存
  script.setAttribute('type', 'module') // 文件中包含es6的语法
  script.setAttribute('id', 'check-version') // 方便加载以后删除

  let body = document.querySelector('body')
  body.appendChild(script)

  cb = cb || function() {}

  let onEnd = 'onload' in script ? stdOnEnd : ieOnEnd
  onEnd(script, cb)
    .then(() => {
      body.removeChild(document.querySelector('#check-version')) // 删除该标签
    })

  // some good legacy browsers (firefox) fail the 'in' detection above
  // so as a fallback we always set onload
  // old IE will ignore this and new IE will set onload
  if (!script.onload) {
    stdOnEnd(script, cb)
  }
}

function stdOnEnd (script, cb) {
  return new Promise((resolve, reject) => {
    script.onload = function () {
      this.onerror = this.onload = null
      cb(null, script)

      resolve()
    }
    script.onerror = function () {
      // this.onload = null here is necessary
      // because even IE9 works not like others
      this.onerror = this.onload = null
      cb(new Error('Failed to load ' + this.src), script)

      reject()
    }
  })
}

function ieOnEnd (script, cb) {
  return new Promise((resolve, reject) => {
    script.onreadystatechange = function () {
      if (this.readyState != 'complete' && this.readyState != 'loaded') return
      this.onreadystatechange = null
      cb(null, script) // there is no way to catch loading errors in IE8

      resolve()
    }
  })
}
