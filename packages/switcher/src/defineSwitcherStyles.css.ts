import { defineProperties } from '@vanilla-extract/sprinkles';
import { type GlobalStyleRule, style } from '@vanilla-extract/css';

import { globals, getConditionsFromMedia } from '@butter-cream/core';

// TODO Put in shared library (see Stack)
export type GlobalStyleMap = Record<
  string,
  { selector: string; rule: GlobalStyleRule }
>;

interface DefineSwitcherParams<
  TSpacingKey extends string | number,
  TMediaQueryKey extends string | number
> {
  spacingScale: Record<TSpacingKey, string | number>;
  mediaQueries: Record<TMediaQueryKey, string | number>;
  defaultMediaQueryKey: TMediaQueryKey;
  threshold: string;
  limit: number;
}

export function defineSwitcherStyles<
  DefaultSpacingKeys extends string | number,
  MediaQueryKeys extends string | number
>({
  spacingScale,
  mediaQueries,
  defaultMediaQueryKey,
  threshold,
  limit,
}: DefineSwitcherParams<DefaultSpacingKeys, MediaQueryKeys>) {
  const switcherBaseStyles = style({
    display: 'flex',
    flexWrap: 'wrap',
  });

  const switcherGlobalStyleMap: GlobalStyleMap = {
    threshold: {
      selector: `.${switcherBaseStyles} > *`,
      rule: {
        flexGrow: 1,
        flexBasis: `calc((${threshold} - 100%) * 999);`,
      },
    },
    limit: {
      selector: `
        .${switcherBaseStyles} > :nth-last-child(n+${limit + 1}),
        .${switcherBaseStyles} > :nth-last-child(n+${limit + 1}) ~ *,
      `,
      rule: {
        flexBasis: '100%',
      },
    },
  };

  const switcherProperties = defineProperties({
    ...getConditionsFromMedia<MediaQueryKeys>({
      mediaQueries,
      defaultMediaQueryKey,
    }),
    properties: {
      alignItems: [
        ...globals,
        'flex-start',
        'center',
        'flex-end',
        'stretch',
        'baseline',
        'auto',
      ],
      justifyContent: [
        ...globals,
        'flex-start',
        'center',
        'flex-end',
        'stretch',
        'baseline',
        'auto',
      ],
      columnGap: spacingScale,
      rowGap: spacingScale,
    },
    shorthands: {
      gap: ['columnGap', 'rowGap'],
    },
  });

  return {
    switcherBaseStyles,
    switcherGlobalStyleMap,
    switcherProperties,
  };
}
