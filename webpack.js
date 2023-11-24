const path = require('path')
const webpackConfig = require('@nextcloud/webpack-vue-config')

webpackConfig.entry.main = path.join(__dirname, 'src', 'main.ts')

// Let webpack determine automatically where it's located
webpackConfig.output.publicPath = 'auto'

module.exports = webpackConfig
