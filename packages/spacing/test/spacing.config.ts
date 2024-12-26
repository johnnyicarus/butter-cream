import { Config } from '@butter-cream/spacing';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const mediaQueries = {
  md: '48rem',
  lg: '64rem',
} as const;

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
      query: '@media (min-width: 48rem)',
      minViewportWidth: '768',
      maxViewportWidth: '1024',
      minDefaultSize: '18',
      maxDefaultSize: '20',
    },
    lg: {
      query: '@media (min-width: 64rem)',
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
  ],
  defaultFont: {
    name: 'base',
    // minCapHeight: '16',
    // maxCapHeight: '18',
    fontSize: '1em',
    lineHeight: '1.5',
    capHeightTrim: '0.1em',
    baselineTrim: '0.1em',
  },
  fonts: [
    {
      name: 'heading1',
      viewports: {
        default: {
          minCapHeight: '24',
          maxCapHeight: '30',
        },
        md: {
          minCapHeight: '30',
          maxCapHeight: '48',
        },
        lg: {
          minCapHeight: '48',
          maxCapHeight: '60',
        },
      },
      fontSize: '1.5em',
      lineHeight: '1.1',
      capHeightTrim: '0.3em',
      baselineTrim: '0.3em',
    },
    {
      name: 'heading2',
      viewports: {
        default: {
          minCapHeight: '20',
          maxCapHeight: '26',
        },
        md: {
          minCapHeight: '26',
          maxCapHeight: '40',
        },
        lg: {
          minCapHeight: '40',
          maxCapHeight: '48',
        },
      },
      fontSize: '1.25em',
      lineHeight: '1.2',
      capHeightTrim: '0.2em',
      baselineTrim: '0.2em',
    },
  ],
};
