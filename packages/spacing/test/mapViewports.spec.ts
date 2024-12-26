import { describe, expect, it } from 'vitest';

import { Viewport } from '../dist';

import { CSSVarFunction } from '../src/defineSpacingStyles';
import { mapViewports } from '../src/mapViewports';

describe('mapViewports', () => {
  // Mock CSS var functions
  const mockMinDefaultSize = 'var(--min-default)' as CSSVarFunction;
  const mockMaxDefaultSize = 'var(--max-default)' as CSSVarFunction;
  const mockMinViewportWidth = 'var(--min-viewport)' as CSSVarFunction;
  const mockMaxViewportWidth = 'var(--max-viewport)' as CSSVarFunction;

  it('should map viewport values correctly', () => {
    const mockViewport: Viewport = {
      query: '@media (min-width: 48rem)',
      minViewportWidth: '768',
      maxViewportWidth: '1024',
      minDefaultSize: '18',
      maxDefaultSize: '20',
    };

    const result = mapViewports({
      minDefaultSize: mockMinDefaultSize,
      maxDefaultSize: mockMaxDefaultSize,
      minViewportWidth: mockMinViewportWidth,
      maxViewportWidth: mockMaxViewportWidth,
      viewport: mockViewport,
    });

    expect(result).toHaveLength(2);
    expect(result[0]).toBe('@media (min-width: 48rem)');
    expect(result[1]).toEqual({
      vars: {
        [mockMinViewportWidth]: '768',
        [mockMaxViewportWidth]: '1024',
        [mockMinDefaultSize]: '18',
        [mockMaxDefaultSize]: '20',
      },
    });
  });

  it('should handle different viewport configurations', () => {
    const mockViewport: Viewport = {
      query: '@media (min-width: 64rem)',
      minViewportWidth: '1024',
      maxViewportWidth: '1280',
      minDefaultSize: '20',
      maxDefaultSize: '24',
    };

    const result = mapViewports({
      minDefaultSize: mockMinDefaultSize,
      maxDefaultSize: mockMaxDefaultSize,
      minViewportWidth: mockMinViewportWidth,
      maxViewportWidth: mockMaxViewportWidth,
      viewport: mockViewport,
    });

    expect(result).toHaveLength(2);
  });
});
