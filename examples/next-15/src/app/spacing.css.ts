import { defineSpacingStyles } from '@butter-cream/spacing';
import { config } from './spacing.config';
import { globalStyle } from '@vanilla-extract/css';

export const spacing = defineSpacingStyles(config);

console.log(spacing);

globalStyle(':root', spacing.spacingGlobalStyleRule);
