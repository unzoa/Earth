/**
 * 获取指定dom的鼠标复制内容
 * @dom [string] e.g. '.className' || '#idName' || ''
 */

/**
 * usage:
 *
import Gst from '@/lib/js/getSelectText'
let gst = ''

// dom记载完成后
gst = new Gst('.security-events')
gst.get((txt, [x, y]) => {
  console.log(txt, x, y)
})

// 记得清除监听
gst.remove()
 *
 */
export default class {
  constructor (dom, win) {
    this.ele = dom || document.querySelector('body')
    this.win = win || window
  }

  /**
   * [get start Listen]
   * @param  {[function]} callback
   */
  get (callback) {
    console.log('Select Text Listener Begin!')

    this.ele.addEventListener('mouseup', e => {
      /**
       * return (选择的字符串，[鼠标抬起的横，纵坐标])
       */
      callback(this.win.getSelection().toString(), [e.offsetX, e.offsetY])
    })
  }

  remove () {
    this.ele.removeEventListener('mouseup', () => {})

    console.log('Select Text Listener has removed!')
  }
}
