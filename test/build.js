const webpack = require("webpack");
const webpackConfig = require("./webpack.config");
const rm = require("rimraf");
const path = require("path");

rm(path.resolve("test", "dist"), error => {
    if (error) {
        throw error;
    }

    webpack(webpackConfig, (err, stats) => {
        if (err) {
            console.error(err.stack || err);
            if (err.details) {
                console.error(err.details);
            }
            return;
        }

        const info = stats.toJson();

        if (stats.hasErrors()) {
            console.error(info.errors);
        }

        if (stats.hasWarnings()) {
            console.warn(info.warnings);
        }

        console.log(
            stats.toString({
                colors: true
            })
        );

        console.log("building finished");
    });
});
