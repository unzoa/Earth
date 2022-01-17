import { NORMAL_USER } from './menu'
import api from './api'
import router from './router'
import './static'

const tokenName = 'system'
localStorage.setItem('tokenName', tokenName)

document.title = 'Earth'

export default {
  tokenName,

  NORMAL_USER,

  api,
  router,

  projectCnName: document.title,
  projectEnName: tokenName,

  companyCnName: '上海戎磐网络科技有限公司'
}
