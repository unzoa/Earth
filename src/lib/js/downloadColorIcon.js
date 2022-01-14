const path = require('path')
const request = require('request')
const fs = require('fs')

// get my project online link on iconfont.cn
const copyUrl = process.env.npm_package_scripts_coloricon.split('URL=')[1]
const iconfont = 'https:' + copyUrl

/**
 * [request iconfont]
 * @param  {[type]} iconfont [online link]
 * @param  {[type]} (error,  response,  body [string]
 */
request(iconfont, (error, response, body) => {
  if (!error && response.statusCode === 200) {
    let getFontFaceStr = body.split('.colorIconfont')[0]
    // @font-face {
    //   font-family: "iconfont"; /* Project id 1756178 */
    //   src: url('//at.alicdn.com/t/font_1756178_zwjwwqx0pf.woff2?t=1620637603229') format('woff2'),
    //       url('//at.alicdn.com/t/font_1756178_zwjwwqx0pf.woff?t=1620637603229') format('woff'),
    //       url('//at.alicdn.com/t/font_1756178_zwjwwqx0pf.ttf?t=1620637603229') format('truetype');
    // }

    let replaceLocalPathStr = `@font-face {
  font-family: "colorIconfont";
  src: url('./iconfont.woff2') format('woff2'),
      url('./iconfont.woff') format('woff'),
      url('./iconfont.ttf') format('truetype');
}
.colorIconfont`


    let restStr = body.split('.colorIconfont')[1]
    let finnalSaveStr = replaceLocalPathStr + restStr
    saveFile('iconfont.css', finnalSaveStr)

    let urlStrArr = getFontFaceStr
      .split('src:')[1]
      .split('}')[0]
      .replace(';', '')
      .replace(/\n/g, '')
      .split(',')

    let urlList = urlStrArr.map(urlStr => {
      let regStr = /\at.*?\'/
      return urlStr.match(regStr)[0].replace("'", '')
    })
    // console.log(urlList)
    // [
    //   'at.alicdn.com/t/font_1756178_zwjwwqx0pf.woff2?t=1620637603229',
    //   'at.alicdn.com/t/font_1756178_zwjwwqx0pf.woff?t=1620637603229',
    //   'at.alicdn.com/t/font_1756178_zwjwwqx0pf.ttf?t=1620637603229'
    // ]

    let downloadUrlList = urlList.map(url => { return `https://${url}` })
    // console.log(downloadUrlList)
    // [
    //   'https://at.alicdn.com/t/font_1756178_zwjwwqx0pf.woff2?t=1620637603229',
    //   'https://at.alicdn.com/t/font_1756178_zwjwwqx0pf.woff?t=1620637603229',
    //   'https://at.alicdn.com/t/font_1756178_zwjwwqx0pf.ttf?t=1620637603229'
    // ]

    /**
     * [download every file]
     */
    downloadUrlList.forEach((i, j) => {
      let filename = 'iconfont.' + i.replace('https://at.alicdn.com/t/', '').split('.')[1].split('?')[0]
      downOther(i, filename)
    })

  }
})

function downOther (url, fileName) {
  let relativePath = '../../assets/iconfontColor/'
  let stream = fs.createWriteStream(path.join(__dirname, relativePath + fileName))
  request(url).pipe(stream).on('close', function (err) {
    console.log('文件[' + fileName + ']下载完毕')
  })
}

function saveFile (filename, data) {
  let relativePath = '../../assets/iconfontColor/'
  // __dirname is get this file's path
  fs.writeFileSync(path.join(__dirname, relativePath + filename), data)
}
