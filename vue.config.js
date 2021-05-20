const path = require('path')
const defaultSettings = require('./src/settings.js')

function resolve(dir) {
  return path.join(__dirname, dir)
}

const name = defaultSettings.title || 'daliangqin' // page title

const port = process.env.port || process.env.npm_config_port || 8088 // dev port

const ENV = require('./env')

module.exports = {
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: './static',
  // lintOnSave: process.env.NODE_ENV === 'development',
  lintOnSave: false,
  productionSourceMap: false,
  devServer: {
    disableHostCheck: true,
    port: port,
    open: true,
    // overlay: {
    //   warnings: false,
    //   errors: true
    // },
    // 代理
    // proxy: {
    // [process.env.VUE_APP_API_TARGET_ADMIN]: {
    //   target: process.env.VUE_APP_API_SOURCE_ADMIN,
    //   changeOrigin: true,
    //   pathRewrite: {
    //     ['^' + process.env.VUE_APP_API_TARGET_ADMIN]: ''
    //   }
    // },
    // [process.env.VUE_APP_API_TARGET_PUBLIC]: {
    //   target: process.env.VUE_APP_API_SOURCE_PUBLIC,
    //   changeOrigin: true,
    //   pathRewrite: {
    //     ['^' + process.env.VUE_APP_API_TARGET_PUBLIC]: ''
    //   }
    // },
    //   '/api/public/': {
    //     target: process.env.VUE_APP_API_SOURCE_PUBLIC,
    //     changeOrigin: true,
    //     pathRewrite: {
    //       ['^' + process.env.VUE_APP_API_TARGET_PUBLIC]: ''
    //     }
    //   },
    // [process.env.API_TARGET_HOSPITAL]: {
    //   target: process.env.VUE_APP_API_SOURCE_HOSPITAL,
    //   changeOrigin: true,
    //   pathRewrite: {
    //     ['^' + process.env.VUE_APP_API_TARGET_HOSPITAL]: ''
    //   }
    // },
    // },
    proxy: {
      '/api/public': {
        target: ENV[ENV.current].public.source,
        changeOrigin: true,
        pathRewrite: {
          '^/api/public/': ''
        }
      }, '/api/admin': {
        target: ENV[ENV.current].admin.source,
        changeOrigin: true,
        pathRewrite: {
          '^/api/admin/': ''
        }
      }, '/api/hospital': {
        target: ENV[ENV.current].hospital.source,
        changeOrigin: true,
        pathRewrite: {
          '^/api/hospital/': ''
        }
      },

    }
    // 代理
    // proxy: {
    //   '/api/public': {
    //     target: 'http://test-api.daliangqing.com/public/',
    //     changeOrigin: true,
    //     pathRewrite: {
    //       '^/api/public/': ''
    //     }
    //   }, '/api/admin': {
    //     target: 'http://test-api.daliangqing.com/admin/',
    //     changeOrigin: true,
    //     pathRewrite: {
    //       '^/api/admin/': ''
    //     }
    //   }, '/api/hospital': {
    //     target: 'http://test-api.daliangqing.com/hospital/',
    //     changeOrigin: true,
    //     pathRewrite: {
    //       '^/api/hospital/': ''
    //     }
    //   },
    // },
    // proxy: {
    //   '/api/public/': {
    //     target: [process.env.VUE_APP_BASE_PUBLIC_API],
    //     changeOrigin: true,
    //     pathRewrite: {
    //       '^api/public/': ''
    //     }
    //   }
    // },
    // proxy: {
    //   [process.env.VUE_APP_BASE_API]: {
    //     target: 'http://test-api.daliangqing.com/admin',
    //     changeOrigin: true,
    //     pathRewrite: {
    //       ['^' + process.env.VUE_APP_BASE_API]: ''
    //     }
    //   },
    //   [process.env.VUE_APP_BASE_PUBLIC_API]: {
    //     target: 'http://test-api.daliangqing.com/public',
    //     changeOrigin: true,
    //     pathRewrite: {
    //       ['^' + process.env.VUE_APP_BASE_PUBLIC_API]: ''
    //     }
    //   },
    //   [process.env.VUE_APP_BASE_HOSPITAL_API]: {
    //     target: 'http://test-api.daliangqing.com/hospital',
    //     changeOrigin: true,
    //     pathRewrite: {
    //       ['^' + process.env.VUE_APP_BASE_HOSPITAL_API]: ''
    //     }
    //   },
    // },
  },
  configureWebpack: {
    name: name,
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
  },
  chainWebpack(config) {
    config.plugin('preload').tap(() => [{
      rel: 'preload',
      fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
      include: 'initial'
    }])
    config.plugins.delete('prefetch')

    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()

    config
      .when(process.env.NODE_ENV !== 'development',
        config => {
          config
            .plugin('ScriptExtHtmlWebpackPlugin')
            .after('html')
            .use('script-ext-html-webpack-plugin', [{
              // `runtime` must same as runtimeChunk name. default is `runtime`
              inline: /runtime\..*\.js$/
            }])
            .end()
          config
            .optimization.splitChunks({
              chunks: 'all',
              cacheGroups: {
                libs: {
                  name: 'chunk-libs',
                  test: /[\\/]node_modules[\\/]/,
                  priority: 10,
                  chunks: 'initial' // only package third parties that are initially dependent
                },
                elementUI: {
                  name: 'chunk-elementUI', // split elementUI into a single package
                  priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
                  test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
                },
                commons: {
                  name: 'chunk-commons',
                  test: resolve('src/components'), // can customize your rules
                  minChunks: 3, //  minimum common number
                  priority: 5,
                  reuseExistingChunk: true
                }
              }
            })
          // https:// webpack.js.org/configuration/optimization/#optimizationruntimechunk
          config.optimization.runtimeChunk('single')
        }
      )
  }
}
