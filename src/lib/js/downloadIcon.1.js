const path = require('path')
const request = require('request')
const fs = require('fs')

// get my project online link on iconfont.cn
const copyUrl = process.env.npm_package_scripts_icon.split('URL=')[1]
const iconfont = 'https:' + copyUrl

/**
 * [request iconfont]
 * @param  {[type]} iconfont [online link]
 * @param  {[type]} (error,  response,  body [string]
 */
request(iconfont, (error, response, body) => {
  if (!error && response.statusCode === 200) {
    /**
     * [get fontface useage url]
     */
    let form = to = 0
    let urlList = []

    while (form !== -1 && to !== -1){
      form = to + 1
      form = body.indexOf("url(", form)
      to = body.indexOf(")", form + 1)

      if(form !== -1 && to !== -1){
        urlList.push(body.substr(form + 5, to - form - 6))
      }
    }

    // duplicate removal
    urlList = [...new Set( urlList.map(_url => _url.split("#")[0]) )]

    /**
     * [edit @font-face {...} str]
     * 1. delete base64
     * 2. delete 'ie6-ie8' row in fontface
     * 3. delete '#iconfont'
     * 4. replace file path to local relative path
     * 5. save edited fontface + classes
     */
    // 1. delete base64
    urlList.splice(1, 1)

    // 2. delete ie6-ie8 row in fontface
    let fontface = body.split('.iconfont')[0]
    let ie9Index = fontface.indexOf('/* IE9 */')
    let base64Index = fontface.indexOf("url('data:application")
    fontface = fontface.replace(fontface.slice(ie9Index, base64Index), '\n  src: ')

    // 3. delete #iconfont
    fontface = fontface.replace('#iconfont', '')

    // 4. replace file path to local relative path
    let replaceStr = urlList[0].split('.').slice(0, 3).join('.')
    fontface = fontface.replace(new RegExp(replaceStr, 'g'), './iconfont')

    // 5. save edited fontface + classes
    saveFile('iconfont.css', fontface + '.iconfont' + body.split('.iconfont')[1])

    /**
     * [download every file]
     */
    urlList.forEach((i, j) => {
      // get every file's format to build up filename
      let filename = 'iconfont.' + i.split('.')[3].split('?')[0]
      downOther('https:' + i, filename)
    })
  }
})

function downOther (url, filename) {
  request(url, (error, response, body) => {
    saveFile(filename, body)
  })
}

function saveFile (filename, data) {
  let relativePath = '../../assets/iconfont/'
  // __dirname is get this file's path
  fs.writeFileSync(path.join(__dirname, relativePath + filename), data)
}
