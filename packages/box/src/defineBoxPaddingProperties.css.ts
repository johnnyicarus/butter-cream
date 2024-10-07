import { getConditionsFromMedia } from '@butter-cream/core';
import { defineProperties } from '@vanilla-extract/sprinkles';
import type { MediaQuerySettings } from './MediaQuerySettings';

export interface DefineBoxPaddingParams<
  TSpacingKey extends string | number,
  TMediaQueryKey extends string | number
> {
  spacingScale: Record<TSpacingKey, string | number>;
  mediaQueries: MediaQuerySettings<TMediaQueryKey>;
}

export function defineBoxPaddingProperties<
  TSpacingKey extends string | number,
  TMediaQueryKey extends string | number
>({
  spacingScale,
  mediaQueries,
}: DefineBoxPaddingParams<TSpacingKey, TMediaQueryKey>) {
  const boxBaseProperties = defineProperties({
    ...getConditionsFromMedia<TMediaQueryKey>({
      mediaQueries: mediaQueries.orderedRecord,
      defaultMediaQueryKey: mediaQueries.defaultKey,
    }),
    properties: {
      paddingBlockStart: spacingScale,
      paddingBlockEnd: spacingScale,
      paddingInlineStart: spacingScale,
      paddingInlineEnd: spacingScale,
    },
    shorthands: {
      padding: [
        'paddingBlockStart',
        'paddingBlockEnd',
        'paddingInlineStart',
        'paddingInlineEnd',
      ],
      paddingInline: ['paddingInlineStart', 'paddingInlineEnd'],
      paddingBlock: ['paddingBlockStart', 'paddingBlockEnd'],
    },
  });

  return { boxBaseProperties };
}
