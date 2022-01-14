const fs = require('fs')
const path = require('path')
const dayjs = require('dayjs')
const verNo = process.env.npm_package_version || ''
const ver = `v${verNo}${verNo && '.'}${dayjs(new Date()).format('YYMMDDHHmm')}`

// 针对vue-cli 3+，开发中没有static文件夹问题处理
const staticPath = path.join(__dirname, '../../../../static/')
const hasStatic = fs.existsSync(staticPath)

if (hasStatic) { // 检查static/version存在
  run()
} else { // 检查 public/version存在
  run('public/static')
}

function delAllVersion (dir) {
  const files = fs.readdirSync(dir)

  files.forEach(file => {
    const fileUrl = `${dir}/${file}`
    fs.unlinkSync(fileUrl)
    console.log(`delete version file: ${file} success!`)
  })
}

function run (cliDiffPath = 'static') {
  // 检查 version文件夹 存在
  const verPath = path.join(__dirname, `../../../../${cliDiffPath}/version`)
  const hasVersionDir = fs.existsSync(verPath)

  if (hasVersionDir) {
    delAllVersion(verPath)
    setVersion(cliDiffPath)
  } else {
    fs.mkdirSync(verPath)
    setVersion(cliDiffPath)
  }
}

function setVersion (cliDiffPath = 'static') {
  const verFiles = [ver, 'version']
  verFiles.forEach((dir, index) => {
    fs.writeFile(
      path.join(__dirname, `../../../../${cliDiffPath}/version/${dir}.js`),
      `/* eslint-disable */ export const version = '${ver}'`,
      'utf8',
      function (error) {
        if (error) {
          console.log(error)
          return false
        }
        !index && console.log('version:' + ver)
      }
    )
  })
}
