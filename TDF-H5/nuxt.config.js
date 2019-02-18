const pkg = require('./package')
const path = require('path')
module.exports = {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content:
          'width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=0'
      },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: false,

  /*
  ** Global CSS
  */
  css: ['@/assets/style/golab.styl'],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: ['~/plugins/tdui', '~/plugins/axios', '~/plugins/hello'],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/axios',
    [
      'nuxt-stylus-resources-loader',
      [
        path.join(__dirname, './assets/style/var/color.styl'),
        path.join(__dirname, './assets/style/var/size.styl'),
        path.join(__dirname, './assets/style/var/mixin.styl')
      ]
    ]
  ],
  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    prefix: '/api/',
    proxy: true
  },
  // http://72.127.2.140:9090
  proxy: {
    '/api/': {
      target: 'http://72.127.2.140:8090',
      pathRewrite: {
        '^/api/': ''
      }
    }
  },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
      config.resolve.alias['api'] = path.resolve(__dirname, 'api')
    },
    postcss: [
      require('postcss-px2rem')({
        remUnit: 100
      })
    ]
  }
}
