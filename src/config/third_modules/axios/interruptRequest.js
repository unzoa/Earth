let cancelTokenArr = []

const notClearAPI = ['aptinfo_list', 'http://localhost:3000/test']

export const pushCancelToken = (api, cancel) => {
  cancelTokenArr.push({
    api,
    cancel
  })
}

export const clearRequest = () => {
  cancelTokenArr.forEach(item => {
    if (notClearAPI.includes(item.api)) return
    item.cancel('路由跳转取消请求')
  })
  cancelTokenArr = []
}
