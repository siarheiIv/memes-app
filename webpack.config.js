var path = require('path');

module.exports = {
  mode: 'development',
  entry: "./src/index.js",
  output: {
    filename: "./bundle.js", // dist/ - by default, so: /dist/bundle.js
  },
  devtool: "inline-source-map", // https://webpack.js.org/configuration/devtool/
  module: {
    rules: [
      {
        test: /.\js$/,
        exclude: /node_modules/,
        use: [
          { loader: "babel-loader" }
        ]
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    port: 3007,
    open: true,
    historyApiFallback: true
  },
  watch: true
}