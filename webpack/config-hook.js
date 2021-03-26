const path = require('path')
const webpack = require('webpack')
const { merge } = require('webpack-merge')

const createPages = require('./create-pages')
const createOptimization = require('./create-optimization')
const createIconFont = require('./create-icon-font')

const { beforeRunMessage } = require('../utils/message')

const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const WebpackNotifierPlugin = require('webpack-notifier')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const GhostProgressWebpackPlugin = require('ghost-progress-webpack-plugin')
  .GhostProgressPlugin

module.exports = function (userConfig, MODE, __rootPath) {
  beforeRunMessage()
  const iconFontPlugin = createIconFont(__rootPath)
  const config = {
    target: MODE === 'development' ? 'web' : 'browserslist',
    devtool: 'source-map',
    mode: MODE,
    stats: {
      all: false,
      errors: true,
      warnings: true,
      colors: true,
      entrypoints: true
    },
    entry: {
      core: path.resolve(__rootPath, 'src/application/index.js')
    },

    output: {
      path: path.resolve(__rootPath, 'dist'),
      filename: '[name].js',
      chunkFilename: '[name].js',
      clean: true
    },
    plugins: [
      iconFontPlugin,
      new MiniCssExtractPlugin({
        filename: '[name].css'
      }),
      new WebpackNotifierPlugin({
        emoji: true,
        title: path.basename(__rootPath).toUpperCase()
      }),
      new GhostProgressWebpackPlugin({
        format: 'compact'
      }),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: 'src/components/**/images/*.*',
            to: 'images/[name][ext]',
            transform: {
              cache: true
            },
            noErrorOnMissing: true
          },
          {
            from: 'src/assets/images/*.*',
            to: 'images/[name][ext]',
            transform: {
              cache: true
            },
            noErrorOnMissing: true
          }
        ]
      }),
      ...createPages(MODE, __rootPath),
      new webpack.DefinePlugin({
        NODE_ENV: JSON.stringify(MODE),
        BUILD_DATE: JSON.stringify(Date.now())
      })
    ],
    optimization: createOptimization(MODE, __rootPath),
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules)/,
          use: ['babel-loader', 'eslint-loader']
        },

        {
          test: /\.pug$/,
          use: [
            {
              loader: 'pug-loader',
              options: {
                root: path.resolve(__rootPath, './src/')
              }
            }
          ]
        },
        {
          test: /\.scss$/i,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                publicPath: 'dist/'
              }
            },
            'css-loader',
            'resolve-url-loader',
            'sass-loader',
            {
              loader: 'sass-resources-loader',
              options: {
                resources: 'src/styles/_resources.scss'
              }
            }
          ]
        },
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader']
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 8192,
                fallback: {
                  loader: 'file-loader',
                  options: {
                    name: '[name].[ext]',
                    outputPath: 'images/',
                    publicPath: 'images/'
                  }
                }
              }
            }
          ]
        },
        {
          test: /\.(woff2)$/i,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]',
                outputPath: '/',
                publicPath: '/'
              }
            }
          ]
        }
      ]
    }
  }
  if (MODE === 'production') {
    config.plugins.push({
      apply: (compiler) => {
        compiler.hooks.done.tap('DonePlugin', () => {
          setTimeout(() => {
            process.exit(0)
          })
        })
      }
    })
  }
  return merge(config, userConfig, {
    context: path.resolve(__rootPath)
  })
}
