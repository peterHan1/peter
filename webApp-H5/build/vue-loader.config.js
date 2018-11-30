module.exports = (isDev) => {
  return {
    preserveWhitepace: true,
    extractCSS: !isDev,
    cssModules: {
      localIdentName: '[path]-[name]-[hash:base64:5]',
      camelCase: true
    },
    postcss: [
      require('postcss-px2rem')({
        remUnit: 100
      })
    ]
  }
}
