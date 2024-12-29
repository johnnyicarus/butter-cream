import { Config } from '@butter-cream/spacing';
import { createStyleObject } from '@capsizecss/core';
import fontMetrics from '@capsizecss/metrics/inter';

export const mediaQueries = {
  md: '48rem',
  lg: '64rem',
} as const;

const base = createStyleObject({
  capHeight: 16,
  lineGap: 24,
  fontMetrics,
});

const heading1 = createStyleObject({
  capHeight: 10,
  lineGap: 2,
  fontMetrics,
});

const heading2 = createStyleObject({
  capHeight: 16,
  lineGap: 20,
  fontMetrics,
});

export const config: Config<keyof typeof mediaQueries> = {
  fontSizeToCapHeightRatio: 1.3744958333, // Inter font,
  defaultViewport: {
    minDefaultSize: '16',
    maxDefaultSize: '18',
    minViewportWidth: '320',
    maxViewportWidth: '768',
  },
  viewports: {
    md: {
      query: '(min-width: 48rem)',
      minViewportWidth: '768',
      maxViewportWidth: '1024',
      minDefaultSize: '18',
      maxDefaultSize: '20',
    },
    lg: {
      query: '(min-width: 64rem)',
      minViewportWidth: '1024',
      maxViewportWidth: '1280',
      minDefaultSize: '20',
      maxDefaultSize: '24',
    },
  },
  defaultSpacingName: 'default',
  spacings: [
    {
      name: 'small',
      viewports: {
        default: {
          minSpacing: '0.875',
          maxSpacing: '0.75',
        },
        md: {
          minSpacing: '0.75',
          maxSpacing: '0.625',
        },
        lg: {
          minSpacing: '0.625',
          maxSpacing: '0.5',
        },
      },
    },
    {
      name: 'large',
      viewports: {
        default: {
          minSpacing: '1.125',
          maxSpacing: '1.25',
        },
        md: {
          minSpacing: '1.25',
          maxSpacing: '1.375',
        },
        lg: {
          minSpacing: '1.375',
          maxSpacing: '1.5',
        },
      },
    },
    {
      name: 'xlarge',
      viewports: {
        default: {
          minSpacing: '1.125',
          maxSpacing: '1.25',
        },
        md: {
          minSpacing: '1.25',
          maxSpacing: '1.75',
        },
        lg: {
          minSpacing: '1.75',
          maxSpacing: '3',
        },
      },
    },
    {
      name: 'xxlarge',
      viewports: {
        default: {
          minSpacing: '1.125',
          maxSpacing: '1.25',
        },
        md: {
          minSpacing: '1.25',
          maxSpacing: '2.5',
        },
        lg: {
          minSpacing: '2.5',
          maxSpacing: '4.5',
        },
      },
    },
    {
      name: 'xxxlarge',
      viewports: {
        default: {
          minSpacing: '1.125',
          maxSpacing: '1.25',
        },
        md: {
          minSpacing: '1.25',
          maxSpacing: '3.25',
        },
        lg: {
          minSpacing: '3.25',
          maxSpacing: '6',
        },
      },
    },
  ],
  defaultFont: {
    name: 'base',
    fontSize: `${parseFloat(base.fontSize)}`, // TODO These should be numbers
    lineHeight: `${parseFloat(base.lineHeight)}`,
    capHeightTrim: base['::after'].marginTop,
    baselineTrim: base['::before'].marginBottom,
  },
  fonts: [
    {
      name: 'heading1',
      viewports: {
        default: {
          minCapHeight: '1.25', // Rems as a number
          maxCapHeight: '1.375', // TODO Should be a number
        },
        md: {
          minCapHeight: '1.375',
          maxCapHeight: '1.625',
        },
        lg: {
          minCapHeight: '1.625',
          maxCapHeight: '2',
        },
      },
      fontSize: `${parseFloat(heading1.fontSize)}`,
      lineHeight: `${parseFloat(heading1.lineHeight)}`,
      capHeightTrim: heading1['::after'].marginTop,
      baselineTrim: heading1['::before'].marginBottom,
    },
    {
      name: 'heading2',
      viewports: {
        default: {
          minCapHeight: '1.1',
          maxCapHeight: '1.2',
        },
        md: {
          minCapHeight: '1.3',
          maxCapHeight: '1.5',
        },
        lg: {
          minCapHeight: '1.5',
          maxCapHeight: '1.8',
        },
      },
      fontSize: `${parseFloat(heading2.fontSize)}`,
      lineHeight: `${parseFloat(heading2.lineHeight)}`,
      capHeightTrim: heading2['::after'].marginTop,
      baselineTrim: heading2['::before'].marginBottom,
    },
  ],
};
