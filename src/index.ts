import { Plugin } from 'rollup';

const NAME = 'rollupStats';

interface RollupStatsOptions {
  /**
   * JSON file output fileName
   * default: stats.json
   */
  fileName?: string;
}

const rollupStats = (options: RollupStatsOptions = {}): Plugin => ({
  name: NAME,
  generateBundle(_, bundle) {
    this.emitFile({
      type: 'asset',
      fileName: options?.fileName || 'stats.json',
      source: JSON.stringify(bundle, null, 2),
    });
  },
});

export default rollupStats;
