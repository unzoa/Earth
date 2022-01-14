// npm run packDist -- lr-1158
const name = process.env.npm_package_scripts_packDist.split(' ')[2] // "1158"

if (name) {
  const path = require('path')
  function pathResolve (params) {
    return path.resolve(__dirname, '../../../' + params)
  }

  const beforePath = pathResolve('dist')
  const afterpath = pathResolve(`${name.replace(/"/g, '')}.zip`)

  // 使用node开始打包

  // zip-a-folder
  const { zip } = require('zip-a-folder')
  zip(beforePath, afterpath)
  .then(su => {
    console.log(su)
  })
  .catch(err => {
    console.log(er)
  })
}
