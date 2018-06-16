const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const {
  removeEmpty,
  propIf,
  propIfNot,
  getIfUtils
} = require('webpack-config-utils');

const REGEX_STYLE_LOADER = /\.(css|scss)$/;
const REGEX_BABEL_LOADER = /\.(js|jsx)$/;
const REGEX_URL_LOADER = /\.(eot|ttf|woff|svg|png)$/;

module.exports = function(env) {
  const { ifNotProd, ifProd } = getIfUtils(env);
  return {
    entry: {
      app: './src/index.jsx',
      vendor: ['react', 'react-dom']
    },
    mode: ifProd() ? 'production' : 'development',
    output: {
      filename: 'js/[name].bundle.[hash].js',
      path: path.resolve(__dirname, 'build')
    },
    devServer: {
      // disable security check for local development
      disableHostCheck: ifNotProd()
    },
    devtool: ifProd() ? 'eval-source-map' : 'source-map',
    optimization: {
      splitChunks: {
        cacheGroups: {
          vendor: {
            chunks: 'initial',
            name: 'vendor',
            test: 'vendor',
            enforce: true
          }
        }
      },
      runtimeChunk: true,
      minimizer: removeEmpty([
        ifProd(new UglifyJsPlugin({
          cache: true,
          parallel: true,
          sourceMap: true
        })),
        ifProd(new OptimizeCSSAssetsPlugin({}))
      ])
    },
    plugins: removeEmpty([
      new HtmlWebpackPlugin({
        title: ifNotProd()
          ? 'Mini Webpack Testbed [dev]'
          : 'Mini Webpack Testbed [prod]',
        template: path.join(__dirname, 'src', 'index.html')
      }),
      ifProd(new MiniCssExtractPlugin('build/style.[contenthash:8].css')),
      ifProd(
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify('production')
        })
      )
    ]),
    module: {
      rules: removeEmpty([
        {
          test: REGEX_URL_LOADER,
          use: 'url-loader',
          exclude: /node_modules/
        },
        {
          test: REGEX_BABEL_LOADER,
          use: 'babel-loader',
          exclude: /node_modules/
        },
        ifProd({
          test: REGEX_STYLE_LOADER,
          use: [MiniCssExtractPlugin.loader, 'css-loader']
        }),
        ifNotProd({
          test: REGEX_STYLE_LOADER,
          use: [
            {
              loader: 'style-loader'
            },
            {
              loader: 'css-loader',
              options: {
                modules: true,
                localIdentName: '[local]',
                importLoaders: 1
              }
            }
          ]
        })
      ])
    }
  };
};
