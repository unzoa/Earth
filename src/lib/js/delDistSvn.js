const path = require('path')
function pathResolve (params) {
  return path.resolve(__dirname, '../../../' + params)
}

const distPath = pathResolve('dist')

const deleteFolder = require('folder-delete')

const list = [
  '/static/flag/.svn/',
  '/static/fonts/.svn/',
  '/static/map/.svn/',
  '/static/vendor/.svn/'
]
list.forEach(i => {
  deleteFolder(distPath + i, {debugLog: false})
})
