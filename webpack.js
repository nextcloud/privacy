const webpackConfig = require('@nextcloud/webpack-vue-config')

// Let webpack determine automatically where it's located
webpackConfig.output.publicPath = 'auto'

module.exports = webpackConfig
