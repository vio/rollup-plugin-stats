import { OutputAsset, OutputBundle, OutputChunk, RenderedModule } from 'rollup';
import omit from 'lodash/omit.js';

export type AssetStats = Omit<OutputAsset, 'source'> & {
  source?: OutputAsset['source'];
};

export type ModuleStats = Omit<RenderedModule, 'code'> & {
  code?: RenderedModule['code'] | null;
}

export type ChunkStats = Omit<OutputChunk, 'code' | 'modules'> & {
  code?: OutputChunk['code'];
  modules: Record<string, ModuleStats>;
};

export type Stats = Record<string, AssetStats | ChunkStats>;

export type StatsOptions = {
  /**
   * Output asset/module sources
   * @default false 
   */
  source?: boolean;
}

export default function extractRollupStats(bundle: OutputBundle, options: StatsOptions = {}): Stats {
  const { source = false } = options;

  const output: Stats = {};

  Object.entries(bundle).forEach(([key, entry]) => {
    if (entry.type === "asset") {
      let entryAsset = structuredClone(entry) as AssetStats;

      // Skip asset source if options.source is false
      if (!source) {
        entryAsset = omit(entryAsset, 'source');
      }

      output[key] = entryAsset;

      return;
    }

    if (entry.type === "chunk") {
      let entryChunk = structuredClone(entry) as ChunkStats;

      // Skip chunk code if options.source is false
      if (!source) {
        entryChunk = omit(entryChunk, 'code');
      }

      Object.entries(entryChunk.modules).forEach(([moduleKey, moduleEntry]) => {
        let entryChunkModule = structuredClone(moduleEntry) as ModuleStats;

        // Skip module source if source is false
        if (!source) {
          entryChunkModule = omit(entryChunkModule, 'code');
        }

        entryChunk.modules[moduleKey] = entryChunkModule;
      });

      output[key] = entryChunk;

      return;
    }
  });
  
  return output;
}
