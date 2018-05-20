const util = require('util');
const inspect = obj => console.log(util.inspect(obj, {
    colors: true,
}))

const iconv = require('iconv-lite');
const debug = require('debug')('ConvertCharsetPlugin');

const { changeHtmlCharsetMeta } = require('./lib/utils');

class ConvertCharsetPlugin {
    constructor(encoding, options) {
        this.encoding = encoding;
        this._options = options;
    }

    apply(compiler) {
        const callback = (cb) => {
            debug('emit done');
            cb();
        }

        const emit = (compilation, cb) => {
            Object.keys(compilation.assets).forEach((filename, index) => {
                debug(`convert ${filename}`);
                let asset = compilation.assets[filename]; 
                compilation.assets[filename] = this.convert(asset, filename);
            })
            // inspect(compilation.assets);
            
            callback(cb);
        } 

        if (compiler.hooks) {
            const plugin = { name: 'ConvertCharsetPlugin' };

            compiler.hooks.emit.tapAsync(plugin, emit);
        } else {
            compiler.plugin('emit', emit);
        }
    }

    convert(asset, filename) {
        let content = asset.source();         
        if (/\.html$/.testfilename) {
            content = changeHtmlCharsetMeta(content, this.encoding);
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
}

module.exports = ConvertCharsetPlugin;