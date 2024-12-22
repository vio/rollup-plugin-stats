import { Plugin } from 'rollup';

import extractRollupStats from './extract';

const PLUGIN_NAME = 'rollupStats';
const DEFAULT_FILE_NAME = 'stats.json';

function defaultFormatOutput(stats: unknown): string {
  return JSON.stringify(stats, null, 2);
}

interface RollupStatsOptions {
  /**
   * JSON file output fileName
   * default: stats.json
   */
  fileName?: string;
}

function rollupStats(options: RollupStatsOptions = {}): Plugin {
  return {
    name: PLUGIN_NAME,
    generateBundle(_, bundle) {
      this.emitFile({
        type: 'asset',
        fileName: options?.fileName || DEFAULT_FILE_NAME,
        source: defaultFormatOutput(extractRollupStats(bundle)),
      });
    },
  } satisfies Plugin;
}

export default rollupStats;
