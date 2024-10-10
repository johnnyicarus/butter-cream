import { getConditionsFromMedia } from '@butter-cream/core';
import { defineProperties } from '@vanilla-extract/sprinkles';
import type { MediaQuerySettings } from './MediaQuerySettings';
import { defaultSizes } from './defaultSizes';

interface BoxSizeSpacingScale<TZeroValueKey extends string | number> {
  zeroValue: Record<TZeroValueKey, string | number>;
}

export interface DefineBoxSizeParams<
  TContainerKey extends string | number,
  TZeroValueKey extends string | number,
  TMediaQueryKey extends string | number
> {
  containerSizeScale: Record<TContainerKey, string | number>;
  spacingScale: BoxSizeSpacingScale<TZeroValueKey>;
  mediaQueries: MediaQuerySettings<TMediaQueryKey>;
}

export function defineBoxSizeProperties<
  TContainerKey extends string | number,
  TZeroValueKey extends string | number,
  TMediaQueryKey extends string | number
>({
  containerSizeScale,
  spacingScale,
  mediaQueries,
}: DefineBoxSizeParams<TContainerKey, TZeroValueKey, TMediaQueryKey>) {
  const sizeValues = {
    ...defaultSizes,
    ...spacingScale.zeroValue,
  };
  const sizeLimitValues = {
    ...defaultSizes,
    ...spacingScale.zeroValue,
    none: 'none',
  };
  const maxWidthValues = {
    ...sizeLimitValues,
    ...containerSizeScale,
  };

  const boxSizeProperties = defineProperties({
    ...getConditionsFromMedia<TMediaQueryKey>({
      mediaQueries: mediaQueries.orderedRecord,
      defaultMediaQueryKey: mediaQueries.defaultKey,
    }),
    properties: {
      width: {
        ...sizeValues,
        viewport: '100vw',
        'viewport-dynamic': '100dvw',
        'viewport-short': '100svw',
        'viewport-long': '100lvw',
      },
      height: {
        ...sizeValues,
        screen: '100vh',
        'viewport-dynamic': '100dvh',
        'viewport-short': '100svh',
        'viewport-long': '100lvh',
      },
      minWidth: sizeLimitValues,
      maxWidth: maxWidthValues,
    },
    shorthands: {
      size: ['width', 'height'],
    },
  });

  return { boxSizeProperties };
}
