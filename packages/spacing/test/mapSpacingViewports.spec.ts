import { mapSpacingViewports } from '../src/mapSpacingViewports';
import type { SpacingViewport } from '../src/config.types';
import type { CSSVarFunction } from '../src/defineSpacingStyles';
import { config } from './spacing.config';
import { describe, expect, it } from 'vitest';

describe('mapSpacingViewports', () => {
  const minSpacing: CSSVarFunction = '--min-spacing' as CSSVarFunction;
  const maxSpacing: CSSVarFunction = '--max-spacing' as CSSVarFunction;

  it('should map spacing viewports correctly for mobile', () => {
    const entry: [string, SpacingViewport] = [
      'md',
      { minSpacing: '8px', maxSpacing: '16px' },
    ];
    const result = mapSpacingViewports({
      config,
      entry,
      minSpacing,
      maxSpacing,
    });

    expect(result).toEqual([
      '@media (min-width: 48rem)',
      {
        vars: {
          '--min-spacing': '8px',
          '--max-spacing': '16px',
        },
      },
    ]);
  });

  it('should map spacing viewports correctly for desktop', () => {
    const entry: [string, SpacingViewport] = [
      'lg',
      { minSpacing: '16px', maxSpacing: '32px' },
    ];
    const result = mapSpacingViewports({
      config,
      entry,
      minSpacing,
      maxSpacing,
    });

    expect(result).toEqual([
      '@media (min-width: 64rem)',
      {
        vars: {
          '--min-spacing': '16px',
          '--max-spacing': '32px',
        },
      },
    ]);
  });

  it('should throw an error if the queryKey is not found in config', () => {
    const entry: [string, SpacingViewport] = [
      'tablet',
      { minSpacing: '12px', maxSpacing: '24px' },
    ];

    expect(() =>
      mapSpacingViewports({ config, entry, minSpacing, maxSpacing })
    ).toThrow();
  });
});
