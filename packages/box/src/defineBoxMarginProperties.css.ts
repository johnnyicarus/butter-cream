import { defineProperties } from '@vanilla-extract/sprinkles';
import type { MediaQuerySettings } from './MediaQuerySettings';
import { getConditionsFromMedia } from '@butter-cream/core';

interface BoxMarginSpacingScale<
  TNegativeSpacingKey extends string | number,
  THalfNegativeSpacingKey extends string | number
> {
  negative?: Record<TNegativeSpacingKey, string | number>;
  halfNegative?: Record<THalfNegativeSpacingKey, string | number>;
}

export interface DefineBoxMarginParams<
  TNegativeSpacingKey extends string | number,
  THalfNegativeSpacingKey extends string | number,
  TMediaQueryKey extends string | number
> {
  spacingScale: BoxMarginSpacingScale<
    TNegativeSpacingKey,
    THalfNegativeSpacingKey
  >;
  mediaQueries: MediaQuerySettings<TMediaQueryKey>;
}

export function defineBoxMarginProperties<
  TNegativeSpacingKey extends string | number,
  THalfNegativeSpacingKey extends string | number,
  TMediaQueryKey extends string | number
>({
  spacingScale,
  mediaQueries,
}: DefineBoxMarginParams<
  TNegativeSpacingKey,
  THalfNegativeSpacingKey,
  TMediaQueryKey
>) {
  const marginValues = {
    ...spacingScale.negative,
    ...spacingScale.halfNegative,
    auto: 'auto',
  };

  const boxMarginProperties = defineProperties({
    ...getConditionsFromMedia<TMediaQueryKey>({
      defaultMediaQueryKey: mediaQueries.defaultKey,
      mediaQueries: mediaQueries.orderedRecord,
    }),
    properties: {
      marginBlockStart: marginValues,
      marginBlockEnd: marginValues,
      marginInlineStart: marginValues,
      marginInlineEnd: marginValues,
    },
    shorthands: {
      margin: [
        'marginBlockStart',
        'marginBlockEnd',
        'marginInlineStart',
        'marginInlineEnd',
      ],
      marginInline: ['marginInlineStart', 'marginInlineEnd'],
      marginBlock: ['marginBlockStart', 'marginBlockEnd'],
    },
  });

  return { boxMarginProperties };
}
