const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const HTMLPlugin = require('html-webpack-plugin')
const ExtractPlugin = require('extract-text-webpack-plugin')
const baseConfig = require('./webpack.config.base')
const VueClientPlugin = require('vue-server-renderer/client-plugin')
const PostCompilePlugin = require('webpack-post-compile-plugin')
const TransformModulesPlugin = require('webpack-transform-modules-plugin')

const isDev = process.env.NODE_ENV === 'development'

const defaultPlugin = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: isDev ? '"development"' : '"production"'
    }
  }),
  new HTMLPlugin({
    template: path.join(__dirname, 'template.html')
  }),
  new VueClientPlugin(),
  new PostCompilePlugin(),
  new TransformModulesPlugin()
]

const devServer = {
  port: 8888,
  host: '0.0.0.0',
  overlay: {
    errors: true
  },
  historyApiFallback: {
    index: '/public/index.html'
  },
  hot: true
}

let config

if (isDev) {
  config = merge(baseConfig, {
    devtool: '#cheap-module-eval-source-map',
    module: {
      rules: [
        {
          test: /\.styl$/,
          use: [
            'style-loader',
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true
              }
            },
            {
              loader: 'stylus-loader',
              options: {
                'resolve url': true
              }
            }
            // 'stylus-loader'
          ]
        }
      ]
    },
    devServer,
    plugins: defaultPlugin.concat([
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin()
    ])
  })
} else {
  config = merge(baseConfig, {
    entry: {
      app: path.join(__dirname, '../client/client-entry.js'),
      vendor: ['vue']
    },
    output: {
      filename: '[name].[chunkhash:8].js',
      publicPath: '/public/'
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          ues: [
            'style-loader',
            'css-loader'
          ]
        },
        {
          test: /\.styl$/,
          use: ExtractPlugin.extract({
            fallback: 'style-loader',
            use: [
              'css-loader',
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: true
                }
              },
              {
                loader: 'stylus-loader',
                options: {
                  'resolve url': true
                }
              }
              // 'stylus-loader'
            ]
          })
        }
      ]
    },
    plugins: defaultPlugin.concat([
      new ExtractPlugin('styles.[contentHash:8].css'),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor'
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'runtime'
      })
    ])
  })
}

module.exports = config
