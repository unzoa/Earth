import Axios from 'axios'
import { pushCancelToken } from './interruptRequest'
import { project } from '@/config/pro'
const { api } = project

function TOKEN () {
  return localStorage[localStorage.tokenName + '_token'] || ''
}

// 请求拦截器
Axios.interceptors.request.use(
  config => {
    config.cancelToken = new Axios.CancelToken(cancel => {
      pushCancelToken(config.url, cancel)
    })

    switch (config.method) {
      case 'get':
        config.params = {
          ...config.params,
          token: TOKEN(),
          submit_user: localStorage.userName
        }
        break

      case 'post':
        if (Object.prototype.toString.call(config.data) === '[object FormData]') {
          config.data.append('token', TOKEN())
          config.data.append('submit_user', localStorage.userName)
        } else {
          config.data.token = TOKEN()
          config.data.submit_user = localStorage.userName
        }
        break

      default:
        break
    }

    // 绑定真实API
    config.url = api[config.url]

    return config
  },

  error => {
    return Promise.reject(error)
  }
)

// 响应拦截器
Axios.interceptors.response.use(
  response => {
    const data = response.data || response

    // 判断是流文件
    if (typeof data === 'string') {
      // 获取流文件的名称
      // **如果获取不到？后端需要配置权限**
      const streamFileName =
        response.headers['content-disposition']
          .split(';')[1]
          .split('=')[1]
          .replace(/"/g, '')

      localStorage.setItem('streamFileName', streamFileName)
    }

    return data
  },

  error => {
    return Promise.reject(error)
    // if (Axios.isCancel(error)) { // 取消请求的情况下，终止promise调用链
    //   return new Promise(() => { })
    // } else {
    //   return Promise.reject(error)
    // }
  }
)
