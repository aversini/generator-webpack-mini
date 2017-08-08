const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');

const REGEX_STYLE_LOADER = /\.(css|scss)$/;

module.exports = function (env) {
  const devtool = env === 'dev' ? 'eval-source-map' : 'source-map';
  const rules = [
    {
      test: /\.(js|jsx)$/,
      use: 'babel-loader',
      exclude: /node_modules/
    }
  ];
  const plugins = [
    new CleanWebpackPlugin(['dist'], {
      verbose: true,
      dry: false
    }),
    new ExtractTextPlugin({
      filename: getPath => {
        return getPath('css/[name].[hash].css').replace('css/js', 'css');
      },
      allChunks: true
    }),
    new HtmlWebpackPlugin({
      title:
        env === 'dev' ?
          'Webpack Scaffolding Developer' :
          'Webpack Scaffolding Production',
      template: path.join(__dirname, 'src', 'index.html')
    })
  ];

  if (env === 'prod') {
    plugins.push(
      new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false
      }),
      new webpack.optimize.UglifyJsPlugin({
        beautify: false,
        sourceMap: true,
        mangle: {
          screw_ie8: true,
          keep_fnames: true
        },
        compress: {
          screw_ie8: true
        },
        comments: false
      })
    );
    rules.push({
      test: REGEX_STYLE_LOADER,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[local]',
              importLoaders: 1,
              minimize: true
            }
          }
        ]
      })
    });
  } else {
    rules.push({
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
    });
  }

  return {
    entry: '<%= entry %>',
    output: {
      filename: 'js/[name].bundle.[hash].js',
      path: path.resolve(__dirname, 'build')
    },
    devtool,
    plugins,
    module: {
      rules
    }
  };
};
