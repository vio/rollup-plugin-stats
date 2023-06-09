# rollup-plugin-stats

> **Warning**
> Under active development

[![](https://img.shields.io/npm/v/rollup-plugin-stats.svg)](https://www.npmjs.com/package/rollup-plugin-stats)
![](https://img.shields.io/node/v/rollup-plugin-stats.svg)
[![CI](https://github.com/vio/rollup-plugin-stats/actions/workflows/main.yml/badge.svg)](https://github.com/vio/rollup-plugin-stats/actions/workflows/main.yml)

Output Rollup stats JSON file 

## Install

```shell
npm install --dev rollup-plugin-stats
```

or

```shell
yarn add --dev rollup-plugin-stats
```


## Configure

```js
// rollup.config.js
const { rollupStats } = require('rollup-plugin-stats');

module.exports = {
  plugins: [
    // add it as the last plugin
    rollupStats(),
  ],
};
```

### Options

- `filename` - the JSON filename relative to the build folder, default: `stats.json`
