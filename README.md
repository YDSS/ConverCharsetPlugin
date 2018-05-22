# ConverCharsetPlugin

a webpack plugin that convert webpack assets to specific charset from `utf-8`, like gbk of course

it will replace your html charset meta(like `<meta charset="UTF-8">`) and css charset declaration(like `@charset 'utf-8'`) as well

## Usage

### Installation

`npm install --save-dev convert-charset-plugin`

**note**: node.js version > 8.0

### Basic Use

```js
// webpack.config.js
const ConverCharsetPlugin = require("convert-charset-plugin");

module.exports = {
    // ...
    plugins: [
        new ConverCharsetPlugin("gbk")
    ]
}
```

## Options

- **includes**(`RegExp`|`Array`), defines which file should be converted. By default only `.js`, `.css`(if you use ExtractTextWebpackPlugin), `.html` and `.json` will be converted