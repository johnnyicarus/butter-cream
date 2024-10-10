import { getConditionsFromMedia } from '@butter-cream/core';
import { defineProperties } from '@vanilla-extract/sprinkles';
import type { MediaQuerySettings } from './MediaQuerySettings';

export interface DefineBoxZIndexParams<
  TZIndexKey extends string | number,
  TMediaQueryKey extends string | number
> {
  zIndexScale: Record<TZIndexKey, string | number>;
  mediaQueries: MediaQuerySettings<TMediaQueryKey>;
}

export function defineBoxZIndexProperties<
  TZIndexKey extends string | number,
  TMediaQueryKey extends string | number
>({
  zIndexScale,
  mediaQueries,
}: DefineBoxZIndexParams<TZIndexKey, TMediaQueryKey>) {
  const boxZIndexProperties = defineProperties({
    ...getConditionsFromMedia<TMediaQueryKey>({
      mediaQueries: mediaQueries.orderedRecord,
      defaultMediaQueryKey: mediaQueries.defaultKey,
    }),
    properties: {
      zIndex: zIndexScale,
    },
  });

  return { boxZIndexProperties };
}
