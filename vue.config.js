const path  =require('path')

const apiPath = 'https://taishi.roarpanda.com:28889'

// 判断是否是生产模式
const isProduction = process.env.NODE_ENV === 'production'

// 定义需要externals的模块
let externals = {
    'vue': 'Vue',
    'vue-router': 'VueRouter',
    'vuex': 'Vuex',
    'element-ui': 'ELEMENT',
  }

// 引入cdn外链 会自动插入 index.html 中
const cdn = {
  // 开发环境
  dev: {
    css: [],
    js: []
  },
  // 生产环境的时候引用vendor中的引用模块
  build: {
    css: ['static/vendor/element-ui/theme-chalk/index.css'],
    js: [
      'static/vendor/vue.min.js',
      'static/vendor/vue-router.min.js',
      'static/vendor/vuex.min.js',
      'static/vendor/element-ui/index.js'
    ]
  }
}

module.exports = {
  publicPath: './',
  outputDir: 'dist', // 输出文件目录
  assetsDir: 'static', // 配置js、css静态资源二级目录的位置
  productionSourceMap: false,  //去掉打包的时候生成的map文件

  devServer: {
    proxy: {
      '/api': {
        target: apiPath,
        changeOrigin: true
      },
      '/user': {
        target: apiPath,
        changeOrigin: true
      }
    }
  },

  configureWebpack: config => {
    // 为生产环境修改配置...
    if (isProduction) {
      // externals
      config.externals = externals
    }
  },

  chainWebpack: config => {
    const oneOfsMap = config.module.rule('scss').oneOfs.store
    oneOfsMap.forEach(item => {
      item
        .use('sass-resources-loader')
        .loader('sass-resources-loader')
        .options({
          // 要公用的scss的路径
          resources: path.resolve(__dirname, 'src/assets/css/color.scss')
        })
        .end()
    })

    // 配置cdn参数
    config.plugin('html').tap(args => {
      if (isProduction) {
        args[0].cdn = cdn.build
      } else {
        args[0].cdn = cdn.dev
      }
      return args
    })

  }
}
