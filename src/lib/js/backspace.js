export default function () {
  const bs = {
    banBackSpace: e => {
      let ev = e || window.event
      // 各种浏览器下获取事件对象
      let obj = ev.relatedTarget || ev.srcElement || ev.target || ev.currentTarget
      // 按下Backspace键
      if (ev.keyCode === 8) {
        let tagName = obj.nodeName // 标签名称
        // 如果标签不是input或者textarea则阻止Backspace
        if (tagName !== 'INPUT' && tagName !== 'TEXTAREA') {
          return bs.stopIt(ev)
        }
        let tagType = obj.type.toUpperCase() // 标签类型
        // input标签除了下面几种类型，全部阻止Backspace
        if (tagName === 'INPUT' && (tagType !== 'TEXT' && tagType !== 'TEXTAREA' && tagType !== 'PASSWORD')) {
          return bs.stopIt(ev)
        }
        // input或者textarea输入框如果不可编辑则阻止Backspace
        if ((tagName === 'INPUT' || tagName === 'TEXTAREA') && (obj.readOnly === true || obj.disabled === true)) {
          return bs.stopIt(ev)
        }
      }
    },
    stopIt: ev => {
      if (ev.preventDefault) {
        // preventDefault()方法阻止元素发生默认的行为
        ev.preventDefault()
      }
      if (ev.returnValue) {
        // IE浏览器下用window.event.returnValue = false;实现阻止元素发生默认的行为
        ev.returnValue = false
      }
      return false
    }
  }

  // 实现对字符码的截获，keypress中屏蔽了这些功能按键
  document.onkeypress = bs.banBackSpace
  // 对功能按键的获取
  document.onkeydown = bs.banBackSpace
}
