const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const ConverCharsetPlugin = require("../index");

module.exports = {
    entry: path.resolve("test", "src", "index.js"),
    output: {
        path: path.resolve("test", "dist"),
        filename: "[name].js"
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: "test/index.html"
        }),
        new ConverCharsetPlugin("gb2312", {
            includes: [/\.text$/]
        }),
        new ExtractTextPlugin("style.css")
    ]
};
