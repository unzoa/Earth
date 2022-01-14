const fs = require('fs')
const path = require('path')

function resolve (dir) { // 指向src
  return path.resolve(__dirname, '../../', dir)
}

fs.readdir(resolve('assets/iconfont/'), (err, files) => {
  files.forEach(i => {
    fs.unlinkSync(resolve('assets/iconfont') + '/' + i)
  })
})
