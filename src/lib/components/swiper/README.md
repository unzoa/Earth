# swiper

> 大数据展示，数据保持最新，dom不能发生数据抖动.

watch:dataList (val) {
  if (Array.isArray(val) && val.length) {
    swiperData =
      swiperData.length <= 20 [数据返回是10，不能让长度低于20]
        ? swiperData.concat(val, val) [低于，拼2次]
        : swiperData.concat(val) [高于，拼一次]
    $refs.mySwiper && swiper.autoplay.start() [以防万一]
  } else {
    [没有返回数据，拼上一次的最后10条]
    swiperData = swiperData.concat(
      swiperData
        .reverse()
        .slice(0, 10)
        .reverse()
    )
  }
}

data:swiperOptions {
  on {
    slideChangeTransitionEnd {
      fn:swiperAction()
    }
  }
}

fn:swiperAction () {
  moveTimes++
  [移动了一次数据返回内容后，就截取删除]
  if (moveTimes % len === 0 && [移动次数是10的倍数]
    swiperData.length > 20) { [数据长度大于20]
    [裁剪掉0-10]
    swiperData = swiperData.slice(len, swiperData.length)
    [无痕移动]
    swiper.slideTo(0, 0, false)
    [以防万一]
    swiperData.length < 20 && swiper.autoplay.stop()
  }
}