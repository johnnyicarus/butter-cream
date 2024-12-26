import { createVar } from '@vanilla-extract/css';
import { describe, expect, it, vi } from 'vitest';
import { getFluidSize } from '../src/getFluidSize';
import { mapSpacings } from '../src/mapSpacings';
import { config } from './spacing.config';
import { CSSVarFunction } from '../src/defineSpacingStyles';

let i = 1;
let j = 1;

vi.mock('@vanilla-extract/css', () => ({
  createVar: vi.fn(() => 'mocked-var-' + i++),
}));

vi.mock('../src/getFluidSize', () => ({
  getFluidSize: vi.fn(() => 'mocked-fluid-size-' + j++),
}));

// vi.mock('../src/mapSpacingViewports', () => ({
//   mapSpacingViewports: vi.fn(() => ['mocked-query', 'mocked-style']),
// }));

describe('mapSpacings', () => {
  const mockFluidFactorSecondOrder = 'var(--fluid-factor)' as CSSVarFunction;

  const spacing = {
    name: 'spacing',
    viewports: {
      default: {
        minSpacing: '2px',
        maxSpacing: '4px',
      },
      md: {
        minSpacing: '8px',
        maxSpacing: '16px',
      },
      lg: {
        minSpacing: '4px',
        maxSpacing: '8px',
      },
    },
  };

  it('should map spacings correctly', () => {
    const result = mapSpacings({
      config,
      fluidFactorSecondOrder: mockFluidFactorSecondOrder,
      spacing,
    });

    expect(createVar).toHaveBeenCalledTimes(4);
    // expect(mapSpacingViewports).toHaveBeenCalledTimes(2);
    expect(getFluidSize).toHaveBeenCalledWith(
      'mocked-var-1',
      'mocked-var-2',
      'var(--fluid-factor)'
    );

    expect(result).toEqual({
      spacingVariableMap: {
        spacing: 'mocked-var-4',
      },
      spacingGlobalStyleRule: {
        vars: {
          'mocked-var-1': '2px',
          'mocked-var-2': '4px',
          'mocked-var-3': 'mocked-fluid-size-1',
          'mocked-var-4': 'mocked-var-3',
        },
        '@media': {
          '@media (min-width: 48rem)': {
            vars: {
              'mocked-var-1': '8px',
              'mocked-var-2': '16px',
            },
          },
          '@media (min-width: 64rem)': {
            vars: {
              'mocked-var-1': '4px',
              'mocked-var-2': '8px',
            },
          },
        },
      },
    });
  });
});
