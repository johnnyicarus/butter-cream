import { expect, test, vi } from 'vitest';

import { defineSpacingStyles } from '../src/defineSpacingStyles';
import { config } from './spacing.config';

const mockReturn = {
  spacingFontSizeClasses: {
    body: 'mock-class-1',
    base: 'mock-class-2',
    heading1: 'mock-class-3',
    heading2: 'mock-class-4',
  },
  spacingGlobalStyleRule: {
    vars: {
      'mocked-var-1': '320',
      'mocked-var-2': '768',
      'mocked-var-3': '16',
      'mocked-var-4': '18',
      'mocked-var-5': 'calc(mocked-var-3 / 16)',
      'mocked-var-6': 'calc(mocked-var-4 / 16)',
      'mocked-var-7': 'calc(mocked-var-1 / 16)',
      'mocked-var-8': 'calc(mocked-var-2 / 16)',
      'mocked-var-9': 'calc(mocked-var-1 / mocked-var-3)',
      'mocked-var-10': 'calc(mocked-var-2 / mocked-var-4)',
      'mocked-var-11':
        'calc((100vw - (mocked-var-7 * 1rem)) / (mocked-var-8 - mocked-var-7))',
      'mocked-var-12':
        'calc((100vw - (mocked-var-9 * 1rem)) / (mocked-var-10 - mocked-var-9))',
      'mocked-var-13':
        'calc((mocked-var-5 * 1rem) + ((mocked-var-6 - mocked-var-5) * mocked-var-11))',
      'mocked-var-14': '1rem',
      'mocked-var-15': '0.875',
      'mocked-var-16': '0.75',
      'mocked-var-17':
        'calc((mocked-var-15 * 1rem) + ((mocked-var-16 - mocked-var-15) * mocked-var-12))',
      'mocked-var-18': 'mocked-var-17',
      'mocked-var-19': '1.125',
      'mocked-var-20': '1.25',
      'mocked-var-21':
        'calc((mocked-var-19 * 1rem) + ((mocked-var-20 - mocked-var-19) * mocked-var-12))',
      'mocked-var-22': 'mocked-var-21',
      'mocked-var-23': '24',
      'mocked-var-24': '30',
      'mocked-var-25':
        'calc(((mocked-var-23 * 1rem) + ((mocked-var-24 - mocked-var-23) * mocked-var-12)) * 1.3744958333)',
      'mocked-var-26': '20',
      'mocked-var-27': '26',
      'mocked-var-28':
        'calc(((mocked-var-26 * 1rem) + ((mocked-var-27 - mocked-var-26) * mocked-var-12)) * 1.3744958333)',
    },
    fontSize: `clamp(
        calc(mocked-var-5 * 1rem),
        mocked-var-13,
        calc(mocked-var-6 * 1rem)
      )`,
    '@media': {
      '@media (min-width: 48rem)': {
        vars: {
          'mocked-var-1': '768',
          'mocked-var-2': '1024',
          'mocked-var-3': '18',
          'mocked-var-4': '20',
          'mocked-var-15': '0.75',
          'mocked-var-16': '0.625',
          'mocked-var-19': '1.25',
          'mocked-var-20': '1.375',
          'mocked-var-23': '30',
          'mocked-var-24': '48',
          'mocked-var-26': '26',
          'mocked-var-27': '40',
        },
      },
      '@media (min-width: 64rem)': {
        vars: {
          'mocked-var-1': '1024',
          'mocked-var-15': '0.625',
          'mocked-var-16': '0.5',
          'mocked-var-19': '1.375',
          'mocked-var-2': '1280',
          'mocked-var-20': '1.5',
          'mocked-var-3': '20',
          'mocked-var-4': '24',
          'mocked-var-23': '48',
          'mocked-var-24': '60',
          'mocked-var-26': '40',
          'mocked-var-27': '48',
        },
      },
    },
  },
  spacingVariableMap: {
    default: 'mocked-var-14',
    large: 'mocked-var-22',
    small: 'mocked-var-18',
  },
};

let i = 1;
let j = 1;

vi.mock('@vanilla-extract/css', () => ({
  createVar: vi.fn(() => 'mocked-var-' + i++),
  style: vi.fn(() => 'mock-class-' + j++),
}));

test('defineSpacingStyles', () => {
  expect(defineSpacingStyles(config)).toEqual(mockReturn);
});
