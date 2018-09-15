const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const {
  removeEmpty,
  propIf,
  propIfNot,
  getIfUtils
} = require("webpack-config-utils");

const REGEX_STYLE_LOADER = /\.(css|scss)$/;
const REGEX_BABEL_LOADER = /\.(js|jsx)$/;
const REGEX_URL_LOADER = /\.(eot|ttf|woff|svg|png)$/;

module.exports = function(env) {
  const { ifNotProd, ifProd } = getIfUtils(env);
  return {
    /*
     * The point or points to enter the application.
     * For SPA, only one entry point is needed, but for optimization
     * purposes, it is sometimes preferable to extract big
     * third-parties (react, d3, etc.) that will not change as much as
     * the application code itself.
     * See the corresponding "optimization.splitChunks" for "vendor".
     */
    entry: {
      app: "./src/index.jsx",
      vendor: ["react", "react-dom"]
    },
    /*
     * Tell webpack to use its built-in optimizations accordingly.
     * Set to either 'production' or 'development'.
     */
    mode: ifProd() ? "production" : "development",
    /*
     * Controls how source maps are generated.
     * eval-source-map: Yields the best quality for development.
     * source-map: A full SourceMap is emitted as a separate file.
     *             It adds a reference comment to the bundle so
     *             development tools know where to find it.
     */
    devtool: ifProd() ? "source-map" : "eval-source-map",
    output: {
      /*
       * The name (and sub-path) of each output bundle.
       */
      filename: "js/[name].bundle.[hash].js",
      /*
       * The output directory as an absolute path.
       */
      path: path.resolve(__dirname, "build")
    },
    devServer: {
      /*
       * Disable security host checking for local development
       */
      disableHostCheck: ifNotProd()
    },
    /*
     * Create optimized chunk for vendor (array of big dependencies,
     * defined in entry)
     */
    optimization: {
      splitChunks: {
        cacheGroups: {
          vendor: {
            chunks: "initial",
            name: "vendor",
            test: "vendor",
            enforce: true
          }
        }
      },
      runtimeChunk: true,
      /*
       * Tells webpack to set process.env.NODE_ENV to
       * a given string value. This allows react optimization
       * at build time for production.
       */
      nodeEnv: ifProd()
        ? JSON.stringify("production")
        : JSON.stringify("development")
    },
    plugins: removeEmpty([
      /*
       * The HtmlWebpackPlugin plugin will generate an HTML5 file
       * that includes all bundles in the body using script tags.
       */
      new HtmlWebpackPlugin({
        title: ifNotProd()
          ? "Mini Webpack Testbed [dev]"
          : "Mini Webpack Testbed [prod]",
        favicon: "src/favicon.ico",
        template: path.join(__dirname, "src", "index.html")
      }),
      /*
       * The MiniCssExtractPlugin plugin extracts CSS into separate files.
       * Applying this extraction for production only, allowing hot-reloading
       * in development mode with CSS in embedded in JavaScript.
       */
      ifProd(new MiniCssExtractPlugin("build/style.[contenthash:8].css"))
    ]),
    module: {
      /*
       * An array of Rules which are matched to requests when modules are created.
       * These rules can modify how the module is created.
       * They can apply loaders to the module, or modify the parser.
       */
      rules: removeEmpty([
        {
          test: REGEX_URL_LOADER,
          use: "url-loader",
          exclude: /node_modules/
        },
        {
          test: REGEX_BABEL_LOADER,
          use: "babel-loader",
          exclude: /node_modules/
        },
        ifProd({
          test: REGEX_STYLE_LOADER,
          use: [MiniCssExtractPlugin.loader, "css-loader"]
        }),
        ifNotProd({
          test: REGEX_STYLE_LOADER,
          use: [
            {
              loader: "style-loader"
            },
            {
              loader: "css-loader",
              options: {
                modules: true,
                localIdentName: "[local]",
                importLoaders: 1
              }
            }
          ]
        })
      ])
    }
  };
};
