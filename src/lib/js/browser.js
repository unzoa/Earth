const { detect } = require('detect-browser')
const browser = detect()
const politenessTxt = '为了用户体验，请使用现代浏览器访问。例如谷歌浏览器、火狐浏览器等！'

// handle the case where we don't detect the browser
switch (browser && browser.name) {
  case 'chrome':
  case 'firefox':
    console.log('supported')
    break

  case 'edge':
    console.log('kinda ok')
    break

  case 'ie':
    console.log('not supported')

    // let ifr = `
    //   <iframe
    //   src="https://baidu.com"
    //   style="height: 100vh; width: 100vw; border: 0;">
    //   </iframe>
    //   `

    // document.querySelector('#app').innerHTML = ifr

    let h1 = document.createElement('h1')
    h1.innerHTML = politenessTxt

    document.querySelector('#app').appendChild(h1)

    break

  default:
    break
}

// 输出boolean， 当ie时，则不执行vue的渲染
export default browser && browser.name === 'ie'
