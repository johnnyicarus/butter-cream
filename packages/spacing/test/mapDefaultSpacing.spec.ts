import { describe, expect, it, vi } from 'vitest';
import { config } from './spacing.config';
import { mapDefaultSpacing } from '../src/mapDefaultSpacing';
import type { GlobalStyleRule } from '@vanilla-extract/css';

let i = 1;
let j = 1;

vi.mock('@vanilla-extract/css', () => ({
  createVar: vi.fn(() => {
    return 'mock-var-' + i++;
  }),
  style: vi.fn(() => 'mock-style-' + j++),
}));

const globalStyles: GlobalStyleRule = {
  vars: {
    'mock-var-1': '320',
    'mock-var-2': '768',
    'mock-var-3': '16',
    'mock-var-4': '18',
    'mock-var-5': 'calc(mock-var-3 / 16)',
    'mock-var-6': 'calc(mock-var-4 / 16)',
    'mock-var-7': 'calc(mock-var-1 / 16)',
    'mock-var-8': 'calc(mock-var-2 / 16)',
    'mock-var-9': 'calc(mock-var-1 / mock-var-3)',
    'mock-var-10': 'calc(mock-var-2 / mock-var-4)',
    'mock-var-11':
      'calc((100vw - (mock-var-7 * 1rem)) / (mock-var-8 - mock-var-7))',
    'mock-var-12':
      'calc((100vw - (mock-var-9 * 1rem)) / (mock-var-10 - mock-var-9))',
    'mock-var-13':
      'calc((mock-var-5 * 1rem) + ((mock-var-6 - mock-var-5) * mock-var-11))',
    'mock-var-14': '1rem',
  },
  fontSize: `clamp(
        calc(mock-var-5 * 1rem),
        mock-var-13,
        calc(mock-var-6 * 1rem)
      )`,
  '@media': {
    '@media (min-width: 48rem)': {
      vars: {
        'mock-var-1': '768',
        'mock-var-2': '1024',
        'mock-var-3': '18',
        'mock-var-4': '20',
      },
    },
    '@media (min-width: 64rem)': {
      vars: {
        'mock-var-1': '1024',
        'mock-var-2': '1280',
        'mock-var-3': '20',
        'mock-var-4': '24',
      },
    },
  },
};

describe('mapDefaultSpacing', () => {
  it('should map default spacing', () => {
    const {
      spacingFontSizeClasses,
      spacingGlobalStyleRule,
      spacingVariableMap,
    } = mapDefaultSpacing({
      config,
    });
    expect(spacingVariableMap).toEqual({
      default: 'mock-var-14',
    });
    expect(spacingGlobalStyleRule).toEqual(globalStyles);
    expect(spacingFontSizeClasses).toEqual({
      base: 'mock-style-2',
      body: 'mock-style-1',
    });
  });
});
