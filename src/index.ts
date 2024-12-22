import { Plugin } from 'rollup';

import extractRollupStats, { type StatsOptions } from './extract';

const PLUGIN_NAME = 'rollupStats';
const DEFAULT_FILE_NAME = 'stats.json';

function defaultFormatOutput(stats: unknown): string {
  return JSON.stringify(stats, null, 2);
}

export type RollupStatsOptions = {
  /**
   * JSON file output fileName
   * default: stats.json
   */
  fileName?: string;
  stats?: StatsOptions;
};

function rollupStats(options: RollupStatsOptions = {}): Plugin {
  const { fileName, stats } = options;

  return {
    name: PLUGIN_NAME,
    generateBundle(_, bundle) {
      this.emitFile({
        type: 'asset',
        fileName: fileName || DEFAULT_FILE_NAME,
        source: defaultFormatOutput(extractRollupStats(bundle, stats)),
      });
    },
  } satisfies Plugin;
}

export default rollupStats;
