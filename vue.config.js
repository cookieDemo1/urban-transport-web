const path = require('path')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const webpack = require('webpack')


function resolve(dir) {
  return path.join(__dirname, dir)
}

const theme = {
  primaryColor: '#1BACFF',
  successColor: '#1BF87B', // 成功色
  warningColor: '#FFA800', // 警告色
  errorColor: '#FF495C', // 错误色

  textPrimaryColor:'#ABCDF6', // 主文本色
  textRegularColor: '#8AB3E5', // 常规文本色
  textColorSecondary: 'rgba(171, 205, 246, 0.75)', //次文本色

  hoverColor: 'rgba(27, 172, 255, 0.15)',
  shadowColor: 'rgba(1,26,67,69%)',

  lineColor: '#163295',
  componentColor: '#051757',
  lightComponentColor: 'rgba(16, 45, 155, 0.3)',
  borderColor: '#0E267C',

  backgroundColor: '#051757',
  // backgroundColor: '#0E267C',
}

const vueConfig = {
  pages: {
    index: {
      // page 的入口
      entry: 'src/main.js',
      // 模板来源
      template: 'public/index.html',
      // 在 dist/index.html 的输出
      filename: 'index.html',
      // // 当使用 title 选项时，
      // // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      // title: 'Index Page',
      // 在这个页面中包含的块，默认情况下会包含
      // 提取出来的通用 chunk 和 vendor chunk。
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    },
    // 当使用只有入口的字符串格式时，
    // 模板会被推导为 `public/subpage.html`
    // 并且如果找不到的话，就回退到 `public/index.html`。
    // 输出文件名会被推导为 `subpage.html`。
    login: 'src/login.js'
  },
  configureWebpack: {
    plugins: [
      new webpack.ContextReplacementPlugin(
        /moment[/\\]locale$/, // 这个参数表明了我们要改变的打包上下文
        /zh-cn/ // 这个参数表示我们只想打包这个正则匹配的文件
      )
    ]
  },
  chainWebpack: (config) => {
    const svgRule = config.module.rule('svg')
    svgRule.exclude.add([resolve('src/assets/svg')])
    // svgRule.uses.clear()
    // svgRule.use('svg-sprite-loader').loader('svg-sprite-loader')
    //svg-sprite-loader 跟webpack5有冲突
    config.module
      .rule('svg2')
      .test(/\.(svg)(\?.*)?$/)
      .include
      .add([resolve('src/assets/svg')])
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()

    if (process.env.ANALYZ_ENV){
      config.plugin("analyze").use(new BundleAnalyzerPlugin())
    }
  },

  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          // 'black': '#fff',
          'primary-color': theme.primaryColor, // 全局主色
          'success-color': theme.successColor, // 成功色
          'warning-color': theme.warningColor, // 警告色
          'error-color': theme.errorColor, // 错误色

          'text-color': theme.textPrimaryColor, // 主文本色
          'text-color-secondary': theme.textColorSecondary, // 次文本色

          // 'icon-color': theme.textColorSecondary,
          // 'icon-color-hover': theme.textPrimaryColor,
          'shadow-color': theme.shadowColor,
          'border-color-base': theme.borderColor,
          'component-background': theme.componentColor,
          // 'body-background': theme.backgroundColor,

          //layout
          'layout-body-background': 'transparent',
          'layout-header-background': 'transparent',
          'layout-sider-background': 'transparent',

          //menu
          // @menu-inline-toplevel-item-height: 40px;
          // @menu-item-height: 40px;
          // 'menu-item-color': theme.primaryColor,
          // 'menu-highlight-color': theme.textPrimaryColor,
          'menu-bg': 'transparent',
          'menu-item-active-bg': 'linear-gradient(90deg, rgba(27, 172, 255, 0.3) 0%, rgba(27, 172, 255, 0) 100%)',

          //breadcrumb
          'breadcrumb-link-color': theme.primaryColor,
          // 'breadcrumb-link-color-hover': @primary-5,
          'breadcrumb-base-color': theme.primaryColor,
          'breadcrumb-separator-color': theme.primaryColor,
          'breadcrumb-last-item-color': theme.textPrimaryColor,


          //form
          // 'label-required-color': @highlight-color,
          'label-color': theme.textPrimaryColor,
          // @form-item-margin-bottom: 24px;
          'form-item-label-colon-margin-right': '12px',
          //input
          'input-height-base': '32px',
          'input-height-lg': '44px',
          // 'input-bg': 'rgba(1, 13, 61, 0.6)',
          'input-bg': theme.componentColor,
          'input-placeholder-color': 'rgba(171, 205, 246, 0.5)',
          //select
          'select-background': theme.componentColor,
          'select-item-selected-bg': theme.hoverColor,
          'select-item-active-bg': theme.hoverColor,

          //button
          'btn-primary-color': 'rgba(255,255,255,0.8)',
          'btn-primary-bg': theme.primaryColor,
          'btn-default-color': theme.textPrimaryColor,
          'btn-default-bg': theme.lightComponentColor,
          'btn-default-border': '#0978B7',
          'btn-danger-bg': theme.errorColor,
          'btn-danger-border': theme.errorColor,

          //switch
          // 'switch-sm-height': '14px',

          // Table
          'table-header-bg': theme.hoverColor,
          'table-header-color': theme.textRegularColor,
          'table-border-radius-base': 0,
          // 'table-row-hover-bg': theme.hoverColor,

          // Pagination
          'pagination-item-size': '20px',
          'pagination-item-bg-active': theme.hoverColor,
        },
        // DO NOT REMOVE THIS LINE
        javascriptEnabled: true
      }
    }
  },

  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
        resolve('/src/style/variable.less'),
        resolve('/src/style/mixin.less'),
      ]
    }
  },

  devServer: {
    port: 8000,
    proxy: {
      '/action': {
        target: 'http://192.168.0.130/',
        ws: false,
        changeOrigin: true,
        // pathRewrite: {'^/action' : '/action'}
      },
      '/cgi-bin': {
        target: 'http://192.168.0.130/',
        ws: false,
        changeOrigin: true,
      },
    },
  },

  // disable source map in production
  productionSourceMap: false,
  lintOnSave: false,
}




module.exports = vueConfig
