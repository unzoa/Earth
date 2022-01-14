import ifvisible from 'ifvisible.js'

const idleEvent = (timer) => {
  ifvisible.setIdleDuration(timer) // 设置不活跃超时 单位/s
  ifvisible.wakeup(() => {
    document.body.style.opacity = 1
  })

  // 切换tab立即执行了
  ifvisible.on('idle', () => {
    // 切换tab后、缩小浏览器为true；不活跃时候为false
    if (!ifvisible.now('hidden')) {
      document.body.style.opacity = 0.5
    }
  })
}

export default idleEvent
