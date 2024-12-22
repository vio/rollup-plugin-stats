import { describe, test, expect } from 'vitest';

import extract from '../../src/extract';
import * as rollupStats from './fixtures/rollup-stats';

describe('extract', () => {
  test('should extract rollup stats', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect(extract(rollupStats.stats as any)).toMatchSnapshot();
  });

  test('should extract rollup stats with sources', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect(extract(rollupStats.stats as any, { source: true })).toMatchSnapshot();
  });
});
