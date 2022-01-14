import Vue from 'vue'
import Axios from 'axios'

const This = Vue.prototype
const ApiPath = This.$api.apiPath()
const ApiArr = This.$api.apiArr

export default {
  post: (Interface, requestData = {}) => {
    return Axios.post(ApiPath + ApiArr[Interface], requestData, {
      transformRequest: [function (requestData) { // 转换数据格式，有待测试传送文件的方式时候同样可行。
        let ret = ''
        for (let it in requestData) {
          ret += encodeURIComponent(it) + '=' + encodeURIComponent(requestData[it]) + '&'
        }
        ret = ret.slice(0, ret.length - 1)
        return ret
      }],
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
  },

  get: (Interface, requestData = {}) => {
    // return tokenDate().then((tokenRes) => {
    //   if (Interface !== 'guestLogin') {
    //     requestData.token = utils.getCookie(This.$projectEnName + '_token')
    //   }
    return Axios.get(ApiPath + ApiArr[Interface], {
      params: requestData,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
    // })
  },

  upload: (Interface, formData, config) => {
    return new Promise((resolve, reject) => {
      Axios.post(ApiPath + ApiArr[Interface], formData, config)
        .then((res) => {
          if (res) {
            resolve(res)
          }
        }).catch((res) => {
          resolve(res)
        })
    })
  },

  blob: (Interface, requestData = {}) => {
    let configOri = {
      params: requestData,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      responseType: 'blob'
    }
    return Axios.get(ApiPath + ApiArr[Interface], configOri)
      .then(r => {
        return window.URL.createObjectURL(new Blob([r]))
      })
  }
}

// const utils = This.$utils

// 请求接口时判断token是否过期
// function tokenDate () {
//   var p = new Promise(function (resolve) {
//     // 当前请求时间
//     let nowTime = Date.parse(new Date()) / 1000
//     // token刷新时间
//     let expTime = Number(utils.getCookie('token_exp'))
//     // token过期时间
//     let refreshExpTime = Number(utils.getCookie('token_refresh_exp'))
//     // 当前请求时间小于刷新token时间并且大于token过期时间，刷新token
//     if (nowTime >= expTime && nowTime < refreshExpTime) {
//       this.post('refreshtoken', {username: utils.getCookie('userName')})
//         .then((res) => {
//           if (res.status === 1) {
//             utils.setCookie(This.$projectEnName + '_token', res.token)
//             utils.setCookie('token_exp', res.token_exp)
//             resolve()
//           }
//         })
//     // 当前请求时间大于token刷新时间，重新登录
//     } else if (nowTime >= refreshExpTime) {
//       utils.setCookie(This.$projectEnName + '_token', '')
//       utils.setCookie('token_refresh_exp', '')
//       utils.setCookie('token_exp', '')
//       resolve()
//     } else {
//       resolve()
//     }
//   })
//   return p
// }
