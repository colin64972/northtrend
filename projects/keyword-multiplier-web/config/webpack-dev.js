require('dotenv').config()
const { EnvironmentPlugin } = require('webpack')
const { merge } = require('webpack-merge')
const { webConfig, preRendersConfig } = require('./webpack')

const devVars = new EnvironmentPlugin({
  STRIPE_PUBLIC_KEY: process.env.STRIPE_PUBLIC_KEY_TEST,
  API_URL: process.env.API_URL_DEV,
  USE_MOCKS: process.env.USE_MOCKS
  // GA_TAG: process.env.GA_TAG,
})

webConfig.plugins.push(devVars)
preRendersConfig.plugins.push(devVars)

const configs = {
  webConfig,
  preRendersConfig
}

module.exports = merge(configs[`${process.env.CONFIG_VER}Config`], {
  mode: 'development',
  devtool: 'source-map'
})
