const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ConverCharsetPlugin = require('../index');

module.exports = {
  entry: path.resolve("test", "src", "index.js"),
  output: {
    path: path.resolve("test", "dist"),
    filename: "[name].js"
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "test/index.html"
    }),
    new ConverCharsetPlugin('gbk')
  ]
};
