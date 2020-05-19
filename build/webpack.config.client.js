'use strict'
const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.config.base')
const VueClientPlugin = require('vue-server-renderer/client-plugin')
const MiniCssExtractPlugin  = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const HOST = 'localhost'
const PORT = 8080
const isDev = process.env.NODE_ENV === 'development'

const defaultPlugins = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: isDev ? '"development"' : '"production"'
    }
  }),
  new VueClientPlugin()
]

let config

if (isDev) {
  config = merge(baseConfig, {
    mode: 'development',
    devtool: '#cheap-module-eval-source-map',
    devServer: {
      clientLogLevel: 'warning',
      hot: true,
      contentBase: false,
      compress: true,
      host: HOST,
      port: PORT,
      open: true,
      proxy: {
        '/api': {
          target: 'http://localhost:8081',
          changeOrigin: true
        }
      },
      overlay: { warnings: false, errors: true },
      publicPath: '/',
      quiet: true
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            'vue-style-loader',
            'css-loader'
          ]
        }, {
          test: /\.scss$/,
          use: [
            'vue-style-loader',
            'css-loader',
            'sass-loader'
          ]
        }, 
      ]
    },
    plugins: defaultPlugins.concat([
      new webpack.HotModuleReplacementPlugin()
    ])
  })
} else {
  config = merge(baseConfig, {
    mode: 'production',
    output: {
      path: path.join(__dirname, '../dist')
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          commons: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendor",
            chunks: "all",
          },
        },
      },
    },
    module: {
      rules: [
        {
          test: /\.css?$/,
          use: [
            MiniCssExtractPlugin.loader, 
            'css-loader'
          ]
        }, {
          test: /\.scss$/,
          use: [
            MiniCssExtractPlugin.loader, 
            'css-loader', 
            'sass-loader'
          ]
        }
      ]
    },
    plugins: defaultPlugins.concat([
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin({
        filename: 'main.css'
      })
    ])
  })
}

module.exports = config
