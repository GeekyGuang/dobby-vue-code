const path = require('path')
module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/morney-web/' : '/',
  lintOnSave: false,

  chainWebpack: (config) => {
    const dir = path.resolve(__dirname, 'src/assets/icons')
    config.module
      .rule('svg-sprite')
      .test(/\.svg$/) // 以.svg结尾
      .include.add(dir)
      .end() // 包含icons目录
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({ extract: false })
      .end() // 配置svg-sprite-loader
      .use('svgo-loader')
      .loader('svgo-loader')
      .tap((options) => ({
        ...options,
        plugins: [{ removeAttrs: { attrs: 'fill' } }],
      }))
      .end()
    config
      .plugin('svg-sprite')
      .use(require('svg-sprite-loader/plugin'), [{ plainSprite: true }]) // 配置插件
    config.module.rule('svg').exclude.add(dir) // 其他svg loader排除icons目录
    config.plugin('html').tap((args) => {
      args[0].title = 'Dobby记账'
      return args
    })
  },
}
