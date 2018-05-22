const _ = require("lodash");
const util = require("util");

/**
 * <meta charset="utf-8"/> to <meta charset="gbk"/>
 *
 * @param {Buffer} htmlContent buffer of html file content
 * @param {string} encoding
 *
 * @return {buffer};
 */
exports.amendHtmlCharsetMeta = function(htmlContent, encoding) {
    let re = /(\<meta.*charset\s*=\s*(\"|\')?\s*)([^\'\"]+)((\"|\')?)/i;
    let content = htmlContent.toString();
    if (re.test(content)) {
        content = content.replace(re, `$1${encoding}$4`);
        return new Buffer(content);
    }

    return htmlContent;
};

/**
 * @charset "utf-8" to @charset "gbk"
 *
 * @param {Buffer} cssContent buffer of css file content
 * @param {string} encoding
 *
 * @return {buffer};
 */
exports.amendCssCharsetMeta = function(cssContent, encoding) {
    let hasCharsetRe = /(^\s*\@charset\s*(\'|\")\s*)([^\'\"]+)(\'|\")/i;
    let content = cssContent.toString();
    if (hasCharsetRe.test(content)) {
        content = content.replace(hasCharsetRe, `$1${encoding}$4`);
        return new Buffer(content);
    }

    return cssContent;
};

exports.isMatchPattern = function(includes, filename) {
    let flag = false;
    _.forEach(includes, pattern => {
        if (pattern.test(filename)) {
            flag = true;
            return false;
        }
    });

    return flag;
};

exports.inspect = obj =>
    console.log(
        util.inspect(obj, {
            colors: true
        })
    );