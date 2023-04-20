import { Plugin } from 'rollup';

const NAME = 'rollupStats';

interface rollupStatsOptions {
  /**
   * JSON file output fileName
   * default: stats.json
   */
  fileName?: string;
}

export const rollupStats = (options: rollupStatsOptions = {}): Plugin => ({
  name: NAME,
  generateBundle(_, bundle) {
    this.emitFile({
      type: 'asset',
      fileName: options?.fileName || 'stats.json',
      source: JSON.stringify(bundle, null, 2),
    });
  },
});
