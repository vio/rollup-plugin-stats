import path from 'node:path';
import process from 'node:process';
import fs from 'node:fs/promises';
import type { Plugin } from 'rollup';

import extractRollupStats, { type Stats, type StatsOptions } from './extract';
import { formatFileSize } from './utils/format-file-size';

const PLUGIN_NAME = 'rollupStats';
const DEFAULT_FILE_NAME = 'stats.json';

export type RollupStatsWriteResponse = {
  filepath: string;
  content: string;
};

export type RollupStatsWrite = (filepath: string, stats: Stats) => RollupStatsWriteResponse;

export type RollupStatsOptions = {
  /**
   * Output filename relative to Rollup output directory or absolute
   * @default: stats.json
   */
  fileName?: string;
  /**
   * Rollup stats options
   */
  stats?: StatsOptions;
  /**
   * Custom file writer
   * @default - fs.write(FILENAME, JSON.stringify(STATS, null, 2));
   */
  write?: RollupStatsWrite;
};

function rollupStats(options: RollupStatsOptions = {}): Plugin {
  const { fileName, stats: statsOptions, writer = rollupStatsWrite } = options;

  return {
    name: PLUGIN_NAME,
    async generateBundle(context, bundle) {
      const resolvedFileName = fileName || DEFAULT_FILE_NAME;
      const filepath = path.isAbsolute(resolvedFileName)
        ? resolvedFileName
        : path.join(context.dir || process.cwd(), resolvedFileName);

      const stats = extractRollupStats(bundle, statsOptions);

      try {
        const res = await writer(filepath, stats);
        const outputSize = Buffer.byteLength(res.content, 'utf-8');

        this.info(`Stats saved to ${res.filepath} (${formatFileSize(outputSize)})`);
      } catch (error) {
        // Log error, but do not throw to allow the compilation to continue
        this.warn(error);
      }
    },
  } satisfies Plugin;
}

export default rollupStats;

async function rollupStatsWrite(filepath: string, stats: Stats): WriteInfo {
  const content = JSON.stringify(stats, null, 2);

  // Create base directory if it does not exist
  await fs.mkdir(path.dirname(filepath), { recursive: true });

  await fs.writeFile(filepath, content);

  return {
    filepath,
    content,
  };
}

