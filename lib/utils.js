exports.changeHtmlCharsetMeta = function (htmlContent, encoding) {
    let re = new RegExp(`(\<meta.*charset\s*=\s*(\"|\')?\s*)(${encoding})(\s*(\"|\')?)`);
    let content = htmlContent.toString();
    if (!re.test(content)) {
        content = content.replace(re, `$1${encoding}$4`);
        return new Buffer(content);
    }

    return htmlContent;
}