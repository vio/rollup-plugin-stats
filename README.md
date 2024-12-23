# rollup-plugin-stats

[![](https://img.shields.io/npm/v/rollup-plugin-stats.svg)](https://www.npmjs.com/package/rollup-plugin-stats)
![](https://img.shields.io/node/v/rollup-plugin-stats.svg)
[![Socket Badge](https://socket.dev/api/badge/npm/package/rollup-plugin-stats)](https://socket.dev/npm/package/rollup-plugin-stats)
[![ci](https://github.com/vio/rollup-plugin-stats/actions/workflows/ci.yml/badge.svg)](https://github.com/vio/rollup-plugin-stats/actions/workflows/ci.yml)

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
// rollup.config.mjs
import stats from 'rollup-plugin-stats';

export default {
  plugins: [
    // add it as the last plugin
    stats(),
  ],
};
```

```js
// rollup.config.js
const stats = require('rollup-plugin-stats');

module.exports = {
  plugins: [
    // add it as the last plugin
    stats(),
  ],
};
```

### Options

- `fileName` - the JSON filename relative to the build folder, default: `stats.json`
- `stats` 
    - `source` - output asset/chunk/module source (default `false`)
    - `excludeAssets` - exclude matching assets: `string | RegExp | ((filepath: string) => boolean) | Array<string | RegExp | ((filepath: string) => boolean)>`
    - `excludeModules` - exclude matching modules: `string | RegExp | ((filepath: string) => boolean) | Array<string | RegExp | ((filepath: string) => boolean)>`
