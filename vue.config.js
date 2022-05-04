const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: [
    'vuetify'
  ]
})

module.exports = {
  devServer: {
  proxy: 'https://europe-west1-promiseq-production2.cloudfunctions.net',
  }
}
