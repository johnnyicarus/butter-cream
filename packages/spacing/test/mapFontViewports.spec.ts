import { GlobalStyleRule } from '@vanilla-extract/css';
import { beforeEach, describe, expect, it } from 'vitest';
import { ResponsiveFontViewport } from '../dist';
import { CSSVarFunction } from '../src/defineSpacingStyles';
import { mapFontViewports } from '../src/mapFontViewports';
import { config } from './spacing.config';

describe('mapFontViewports', () => {
  const mockMinSizeFont = 'var(--min-size)' as CSSVarFunction;
  const mockMaxSizeFont = 'var(--max-size)' as CSSVarFunction;

  let globalStyleRule: GlobalStyleRule;

  beforeEach(() => {
    globalStyleRule = { vars: {} };
  });

  it('should create media query rule with font sizes for empty globalStyleRule', () => {
    const viewport: ResponsiveFontViewport = {
      minCapHeight: '16',
      maxCapHeight: '24',
    };

    const foo = mapFontViewports({
      config: config,
      entry: ['md', viewport],
      minSizeFont: mockMinSizeFont,
      maxSizeFont: mockMaxSizeFont,
    });

    expect(foo).toEqual([
      '@media (min-width: 48rem)',
      {
        vars: {
          'var(--max-size)': '24',
          'var(--min-size)': '16',
        },
      },
    ]);
  });
});
