/* eslint-disable */
import loadScript from './loadScript'

export default (cli3 = false, callback) => {
  callback = callback || function() {
    window.location.reload()
  }

  // const version = require(`../../../../${cli3 ? 'static' : 'static'}/version/version.js`).version
  const version = require(`../../../../${cli3 ? 'public/static' : 'static'}/version/version.js`).version

  loadScript(
    cli3
      ? `static/version/${version}.js`
      : `${location.origin}/static/version/${version}.js`,

    function (err, {src}) {
      if (err) {
        new Error('err: versionjs does not alive!')
        callback()
      } else {
        // console.log(src)
      }
    }
  )
}
