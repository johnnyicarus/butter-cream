import { expect, test } from 'vitest';
import { defineBoxPaddingProperties } from '@butter-cream/box';

import { Config } from '../src/config.types';
import { defineSpacingStyles } from '../src/defineSpacingStyles';

const mockMediaQueries = {
  default: '',
  md: '(min-width: 768px)',
  lg: '(min-width: 1280px)',
};

const mockConfig: Config<keyof typeof mockMediaQueries> = {
  fontSizeToCapHeightRatio: 1.5,
  defaultViewport: {
    minViewportWidth: 'var(--default-min-viewport)',
    maxViewportWidth: 'var(--default-max-viewport)',
    minDefaultSize: 'var(--default-min-size)',
    maxDefaultSize: 'var(--default-max-size)',
  },
};

const mockReturn = {
  spacingGlobalStyleRule: {},
  spacingVariableMap: {},
  spacingFontStyleClasses: {},
};

test('defineSpacingStyles', () => {
  expect(defineSpacingStyles(mockConfig)).toEqual(mockReturn);
});
