const _ = require("lodash");
const iconv = require("iconv-lite");
const debug = require("debug")("ConvertCharsetPlugin");

const {
    amendHtmlCharsetMeta,
    amendCssCharsetMeta,
    isMatchPattern,
    inspect
} = require("./lib/utils");

/**
 * pattern of files thoese will be converted
 */
const includes = [/\.js$/, /\.css$/, /\.html$/, /\.json$/];

class ConvertCharsetPlugin {
    constructor(encoding, options = {}) {
        this.encoding = encoding;
        if (!iconv.encodingExists(encoding)) {
            throw new Error(
                `charset ${encoding} is not supported, please check on iconv-lite's wiki for available encodings:\nhttps://github.com/ashtuchkin/iconv-lite/wiki/Supported-Encodings`
            );
        }
        this.options = this.handleOptions(options);
    }

    apply(compiler) {
        const callback = cb => {
            debug("emit done");
            cb();
        };

        const emit = (compilation, cb) => {
            let errors = [];

            Object.keys(compilation.assets).forEach((filename, index) => {
                // only convert files match the includes pattern
                if (!isMatchPattern(this.options.includes, filename)) {
                    return;
                }
                debug(`convert ${filename}`);
                let asset = compilation.assets[filename];
                try {
                    compilation.assets[filename] = this.convert(
                        asset,
                        filename
                    );
                } catch (err) {
                    debug(`covert ${filename} error`);
                    errors.push(err);
                }
            });
            // inspect(compilation.assets);

            if (errors.length) {
                compilation.errors = compilation.errors.concat(errors);
            }
            callback(cb);
        };

        if (compiler.hooks) {
            const plugin = { name: "ConvertCharsetPlugin" };

            compiler.hooks.emit.tapAsync(plugin, emit);
        } else {
            compiler.plugin("emit", emit);
        }
    }

    convert(asset, filename) {
        let content = asset.source();
        if (/\.html$/.test(filename)) {
            debug(`amend ${filename} charset meta to ${this.encoding}`);
            content = amendHtmlCharsetMeta(content, this.encoding);
        }
        if (/\.css$/.test(filename)) {
            debug(`amend ${filename} charset meta to ${this.encoding}`);
            content = amendCssCharsetMeta(content, this.encoding);
        }
        let converted = iconv.encode(content, this.encoding);

        return {
            source: () => {
                return converted;
            },
            size: () => {
                return converted.length;
            }
        };
    }

    handleOptions(options) {
        // merge includes
        if (Array.isArray(options.includes)) {
            options.includes = _.uniq(options.includes.concat(includes));
        } else if (_.isRegExp(options.includes)) {
            options.includes = [options.includes].concat(includes);
        } else {
            // use default include directly
            options.includes = includes;
        }

        return options;
    }
}

module.exports = ConvertCharsetPlugin;
