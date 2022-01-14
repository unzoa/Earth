function getCookie (cookieName) {
  const strCookie = document.cookie
  // 将多cookie切割为多个名/值对
  const arrCookie = strCookie.split('; ')
  let userId
  // 遍历cookie数组，处理每个cookie对
  for (let i = 0; i < arrCookie.length; i++) {
    const arr = arrCookie[i].split('=')
    // 找到名称为userId的cookie，并返回它的值
    if (cookieName === arr[0]) {
      userId = arr[1]
      break
    }
  }
  return unescape(userId)
}

function setCookie (name, value) {
  // 定义一天
  const days = 1
  const exp = new Date()
  // 定义的失效时间，
  exp.setTime(exp.getTime() + days * 24 * 60 * 60 * 1000)
  // 写入Cookie  ，toGMTstring将时间转换成字符串。
  document.cookie = name + '=' + escape(value) + ';path=/;expires=' + exp.toGMTString
}

// 验证用户名
// 验证输入内容 用户名验证 case=0 ,密码验证 case=1
function testUser (val, type) {
  if (type === 0) {
    var reg = new RegExp('^[A-Za-z0-9-]+$')
    var rs = ''
    for (var i = 0; i < val.length; i++) {
      rs = rs + (reg.test(val.substr(i, 1)) ? val.substr(i, 1) : '')
    }
    return rs
  } else if (type === 1) {
    var reg2 = new RegExp('^[A-Za-z0-9_\u4e00-\u9fa5]+$')
    var rs2 = ''
    for (var j = 0; j < val.length; j++) {
      rs2 = rs2 + (reg2.test(val.substr(j, 1)) ? val.substr(j, 1) : '')
    }
    return rs2
  }
}

// 验证密码
// 汉字、英文字母、数字、英文下划线
function tagName (str) {
  var reg = new RegExp('^[A-Za-z0-9_\u4e00-\u9fa5]+$')
  var rs = ''
  for (var i = 0; i < str.length; i++) {
    rs = rs + (reg.test(str.substr(i, 1)) ? str.substr(i, 1) : '')
  }
  return rs
}

// 验证文件名
function testFileName (str) {
  if (/^[\w-.]+$/.test(str) && str.indexOf(' ') === -1) {
    return true
  }
  return false
}

function dateFormat (val) {
  var Time = val
  var choose = -1
  Time = String(Time).split('.')[0]
  if (/^(\d{10})$/.test(Time)) {
    // 时间戳
    choose = 1
  } else if (/^(((\d{4})[-](\d{1,2})[-](\d{1,2})))[T\s](\d{1,2}):(\d{1,2}):(\d{1,2})$/.test(Time)) {
    // 匹配 2018-11-28T00:12:40
    if (Time.indexOf(' ') > -1) {
      Time = Time.replace(' ', 'T')
    }
    choose = 0
  } else {
    choose = 0
  }
  Time = Time.replace(/-/g, '/').replace('T', ' ')
  if (choose === 0) {
    // 日期转换
    Time = new Date(Time)
    const o = [Time.getMonth() + 1, Time.getDate(), Time.getHours(), Time.getMinutes(), Time.getSeconds()]
    o.forEach((k, j) => {
      if (String(k).length === 1) {
        if (k !== 0) {
          o[j] = '0' + String(k)
        } else {
          o[j] = '00'
        }
      }
    })
    return Time.getFullYear() + '-' + o[0] + '-' + o[1] + ' ' + o[2] + ':' + o[3] + ':' + o[4]
  } else if (choose === 1) {
    // 时间戳转换
    if (Time) {
      var date = new Date(Time * 1000)
      var Y = date.getFullYear() + '-'
      var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
      var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' '
      var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
      var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'
      var s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds())
      return Y + M + D + h + m + s
    } else {
      return '0000-00-00 00:00:00'
    }
  }
}

// 时间戳转换
function timestampToTime (timestamp) {
  var date = new Date(timestamp * 1000)
  var Y = (date.getFullYear() || 8888) + '-'
  var M = (date.getMonth() + 1 < 10 ? '0' + ((date.getMonth() || 87) + 1) : (date.getMonth() || 87) + 1) + '-'
  var D = (date.getDate() < 10 ? '0' + (date.getDate() || 87) : (date.getDate() || 87)) + ' '
  var h = (date.getHours() < 10 ? '0' + (date.getHours() || 87) : (date.getHours() || 87)) + ':'
  var m = (date.getMinutes() < 10 ? '0' + (date.getMinutes() || 87) : (date.getMinutes() || 87)) + ':'
  var s = (date.getSeconds() < 10 ? '0' + (date.getSeconds() || 87) : (date.getSeconds() || 87))
  return Y + M + D + h + m + s
}

// obj arr 继承
function inheritObj (obj) {
  return JSON.parse(JSON.stringify(obj))
}

// 打印
function print () {
  // 打印开始之前，隐藏sidebar
  if (Number(window.localStorage.userClass) !== 4) {
    const sideBar = document.querySelector('.side-bar')
    const btn = document.querySelector('.handleButton')
    sideBar && (sideBar.className = 'side-bar')
    btn && (btn.className = 'handleButton __handCursor')
  }
  // 开始打印
  window.print()
}

function debounce (func, delay = 100) {
  let timer

  return function (...args) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}

// 文件下载
function downloadFile (url, callback) {
  try {
    var elemIF = document.createElement('iframe')
    elemIF.src = url
    elemIF.style.display = 'none'
    elemIF.setAttribute('frameborder', '0')
    document.body.appendChild(elemIF)
    if (callback) {
      callback()
    }
  } catch (e) {
    alert('下载异常!')
  }
}

function downloadBlob (url, fileName = '') {
  const link = document.createElement('a')
  link.style.display = 'none'
  link.href = url
  link.download = fileName
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  window.URL.revokeObjectURL(url) // 释放
}

// 数字转单位
function numberChange (num) {
  const nn = isNaN(num) ? 0 : String(num)
  let showNum = 0
  const func = (ll, kmgt) => {
    return nn.slice(0, nn.length - ll) + '.' + nn.slice(nn.length - ll, nn.length - ll + 2) + kmgt
  }
  if (nn.length <= 3) {
    showNum = nn
  } else if (nn.length > 3 && nn.length <= 6) {
    showNum = func(3, 'K')
  } else if (nn.length > 6 && nn.length <= 9) {
    showNum = func(6, 'M')
  } else if (nn.length > 9 && nn.length <= 12) {
    showNum = func(9, 'G')
  } else if (nn.length > 12) {
    showNum = func(12, 'T')
  }
  return showNum
}

function numberBeauty (num) {
  let n = num
  switch (true) {
    case num >= 1000 && num < 10000:
      n = (n / 1000).toFixed(1) + '千'
      break

    case num >= 10000 && num < 100000000:
      n = (n / 10000).toFixed(1) + '万'
      break

    case num >= 100000000:
      n = (n / 100000000).toFixed(1) + '亿'
      break

    default:
      break
  }
  return n
}

function newTab (path, params) {
  let urlParams = ''
  if (params) {
    Object.keys(params).forEach((i, j) => {
      urlParams += `${i}=${params[i]}`
      if (Object.keys(params).length > j) {
        urlParams += '&'
      }
    })
  }
  window.open(window.location.protocol + '//' +
    window.location.hostname +
    (window.location.port ? ':' + window.location.port : '') +
    '/#/' + path + '?' + urlParams)
}

/*
** randomWord 产生任意长度随机字母数字组合
** randomFlag-是否任意长度 min-任意长度最小位[固定位数] max-任意长度最大位
*/
function randomWord (randomFlag, min, max) {
  let str = ''
  let range = min
  const arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
  // 随机产生
  if (randomFlag) {
    range = Math.round(Math.random() * (max - min)) + min
  }
  for (var i = 0; i < range; i++) {
    const pos = Math.round(Math.random() * (arr.length - 1))
    str += arr[pos]
  }
  return str
}

/**
 * [将一个对象切割成N个对象并加入到一个数组]
 * @param  {[object]} d [要分割的数组]
 * @param  {[numbre]} n [分割数]
 * @return {[type]}   [返回的数组]
 */
function splitObjToArr (d, n) {
  const objLen = Object.keys(d).length // 由于vue动态给数据对象添加的__ob__增加了属性名长度, getOwnPropertyNames 会获取到
  const targetArr = [] // 最后导出
  let objFlag = 1 // 递归行计数
  let objItem = {} // 单行存储
  for (const x in d) {
    objItem[x] = d[x]
    if (objFlag < n) {
      objFlag++
    } else if (objFlag === n) {
      // 当行最后一位
      objFlag = 1
      targetArr.push(objItem)
      objItem = {}
    } else if (targetArr.length === parseInt(objLen / n) && objFlag === objLen % n) {
      // 不足一行
      // 导出 === 总行数 - 1
      // && 递增flag === 最后一行数
      targetArr.push(objItem)
    }
  }
  return targetArr
}
function splitArrToArr (d, n) {
  const targetArr = [] // 最后导出
  let objItem = {} // 单行存储
  let objFlag = 1 // 递归行计数
  d.forEach((i, j) => {
    objItem[i.family] = i.rate
    if (objFlag < n) {
      objFlag++
    } else if (objFlag === n) {
      // 当行最后一位
      objFlag = 1
      targetArr.push(objItem)
      objItem = {}
    } else if (targetArr.length === parseInt(d.length / n) && objFlag === d.length % n) {
      // 不足一行
      // 导出 === 总行数 - 1
      // && 递增flag === 最后一行数
      targetArr.push(objItem)
    }
  })
  return targetArr
}

/**
 * [排序，针对echarts数据的排序[{name: String, value: Number}]]
 * @param  {[array]} arr [要排序的数组]
 * @return {[array]}     [根据value排序的数组]
 */
function compareAndSort (arr) {
  function compare (obj1, obj2) {
    const val1 = obj1.value
    const val2 = obj2.value
    if (val1 > val2) {
      return -1
    } else if (val1 < val2) {
      return 1
    } else {
      return 0
    }
  }
  const r = inheritObj(arr)
  r.sort(compare)
  return r
}

function diffTwoStr (str1, str2) {
  // # 找出相同的片段
  const x = str1.split('')
  const y = str2.split('')

  let long = []
  let short = []
  if (x.length !== y.length) {
    long = x.length > y.length ? x : y
    short = x.length > y.length ? y : x
  } else {
    long = x
    short = y
  }

  // 遍历对比
  // 比较段级的

  const sliceArr = []
  let silceItem = []
  let flag = 0
  const f = () => {
    for (flag; flag <= short.length; flag++) {
      if (short[flag] === undefined) { // 到最后一位时候
        silceItem.push('undefined')
        flag++
      } else {
        silceItem.push(short[flag])
      }

      if (long.join('').indexOf(silceItem.join('')) === -1) { // 片段不存在于long
        silceItem.pop() // 删掉本次段上最后一位，保持插入aliceArr中的相同的片段
        if (silceItem.length > 30) { // 裁剪的片段长度大于一
          sliceArr.push(silceItem.join(''))
        }
        silceItem = []
        f()
      }
    }
  }
  f()

  // console.log(sliceArr)

  // - 计算相同的片段在str中的位置
  // - 判断段的显示
  const exportStr = (str) => {
    const indexArr = []
    sliceArr.forEach((i, j) => {
      let p = str.indexOf(i)
      while (p > -1) {
        indexArr.push([p, p + i.length, i.length, j, i])
        p = str.indexOf(i, p + 1)
      }
    })

    // 从长到短排序
    const resetArr = indexArr.sort((a, b) => {
      if (a[2] > b[2]) {
        return -1
      } else {
        return 1
      }
    })

    return str.split('').map((i, j) => {
      let times = 0
      let color = null
      resetArr.forEach((ii, jj) => {
        if (j >= ii[0] && j < ii[1]) {
          times++
          color = ii[3]
        }
      })
      return {
        name: i,
        value: Boolean(times),
        color: color
      }
    })
  }

  return [exportStr(str1), exportStr(str2)]
}

function base64ToBlob (base64) {
  // base64 不带data:image/jpeg;base64, 前缀
  const bstr = atob(base64)
  let n = bstr.length
  const u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return window.URL.createObjectURL(new Blob([u8arr]))
}

function blobToDataURL (blob, callback) {
  var a = new FileReader()
  a.onload = function (e) { callback(e.target.result) }
  a.readAsDataURL(blob)
}

// 分割数组，以size为元素长度，组成新的数组
function chunk (arr, size = 1) {
  return Array.from(
    {
      length: Math.ceil(arr.length / size)
    },
    (v, i) => arr.slice(i * size, i * size + size)
  )
}

// 记录元素出现次数
function countOccurrences (arr, value) {
  return arr.reduce((a, v) => (v === value ? a + 1 : a + 0), 0)
}

// 扁平化数组
function flatten (arr, depth = -1) {
  if (depth === -1) {
    return [].concat(
      ...arr.map((v) => (Array.isArray(v) ? this.flatten(v) : v))
    )
  }
  if (depth === 1) {
    return arr.reduce((a, v) => a.concat(v), [])
  }
  return arr.reduce(
    (a, v) => a.concat(Array.isArray(v) ? this.flatten(v, depth - 1) : v),
    []
  )
}

// 返回两个数组中相同的元素
function intersection (arr1, arr2) {
  return arr2.filter((v) => arr1.includes(v))
}

// 返回数组中第 n 个元素
// 支持负数
function nthElement (arr, n = 0) {
  return (n >= 0 ? arr.slice(n, n + 1) : arr.slice(n))[0]
}

// 获取 url 中的参数 对象
function getURLParameters (url) {
  const f = (obj, current) => {
    obj[current.slice(0, current.indexOf('='))] = current.slice(current.indexOf('=') + 1)
    return obj
  }

  return url
    .match(/([^?=&]+)(=([^&]*))/g)
    .reduce(f, {})
}

// 滚动条回到顶部动画
function scrollToTop () {
  const scrollTop =
    document.documentElement.scrollTop || document.body.scrollTop
  if (scrollTop > 0) {
    window.requestAnimationFrame(scrollToTop)
    window.scrollTo(0, scrollTop - scrollTop / 8)
  } else {
    window.cancelAnimationFrame(scrollToTop)
  }
}

// 判断元素是否在可视范围内
// partiallyVisible 为是否为完全可见
function elementIsVisibleInViewport (el, partiallyVisible = false) {
  const { top, left, bottom, right } = el.getBoundingClientRect()

  return partiallyVisible
    ? ((top > 0 && top < innerHeight) ||
        (bottom > 0 && bottom < innerHeight)) &&
        ((left > 0 && left < innerWidth) || (right > 0 && right < innerWidth))
    : top >= 0 && left >= 0 && bottom <= innerHeight && right <= innerWidth
}

/**
 * 进入全屏
 * @param {*} element 可以是一个任意dom元素
 */
function launchFullscreen (element = document.documentElement) {
  if (element.requestFullscreen) {
    element.requestFullscreen()
  } else if (element.mozRequestFullScreen) {
    element.mozRequestFullScreen()
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen()
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullScreen()
  }
}

// 退出全屏
function exitFullscreen () {
  if (document.exitFullscreen) {
    document.exitFullscreen()
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen()
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen()
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen()
  }
}

// 前端做分页 data为存储当前页数据的数组 e为总数据 val为页码 pageSize为每页条数
const pagechange = (data, e, val, pageSize) => {
  if (e && e.length) {
    var start = (val - 1) * pageSize
    var end = Math.min(start + pageSize, e.length)
    e.slice(start, end).forEach((i, j) => {
      data.push(i)
    })
  }
}

export default {
  getCookie,
  setCookie,
  testUser,
  tagName,
  testFileName,
  dateFormat,
  timestampToTime,
  inheritObj,
  debounce,
  downloadFile,
  downloadBlob,
  numberChange,
  numberBeauty,
  newTab,
  print,
  randomWord,
  splitObjToArr,
  splitArrToArr,
  compareAndSort,
  diffTwoStr,
  base64ToBlob,
  blobToDataURL,

  chunk,
  countOccurrences,
  flatten,
  intersection,
  nthElement,
  getURLParameters,
  scrollToTop,
  elementIsVisibleInViewport,
  launchFullscreen,
  exitFullscreen,
  pagechange
}
