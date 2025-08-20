const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: './', // Используйте относительные пути
  outputDir: 'dist',
  assetsDir: 'static',

  configureWebpack: {
    output: {
      publicPath: '/'
    }
  }
})
