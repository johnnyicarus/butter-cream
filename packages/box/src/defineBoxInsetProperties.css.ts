import { getConditionsFromMedia } from '@butter-cream/core';
import { defineProperties } from '@vanilla-extract/sprinkles';
import { defaultSizes } from './defaultSizes';
import type { MediaQuerySettings } from './MediaQuerySettings';

interface BoxInsetSpacingScale<
  TZeroValueKey extends string | number,
  TDefaultSpacingKey extends string | number,
  TNegativeSpacingKey extends string | number,
  THalfSpacingKey extends string | number,
  THalfNegativeSpacingKey extends string | number
> {
  zeroValue: Record<TZeroValueKey, string | number>;
  default: Record<TDefaultSpacingKey, string | number>;
  negative?: Record<TNegativeSpacingKey, string | number>;
  half?: Record<THalfSpacingKey, string | number>;
  halfNegative?: Record<THalfNegativeSpacingKey, string | number>;
}

export interface DefineBoxInsetParams<
  TZeroValueKey extends string | number,
  TDefaultSpacingKey extends string | number,
  TNegativeSpacingKey extends string | number,
  THalfSpacingKey extends string | number,
  THalfNegativeSpacingKey extends string | number,
  TMediaQueryKey extends string | number
> {
  spacingScale: BoxInsetSpacingScale<
    TZeroValueKey,
    TDefaultSpacingKey,
    TNegativeSpacingKey,
    THalfSpacingKey,
    THalfNegativeSpacingKey
  >;
  mediaQueries: MediaQuerySettings<TMediaQueryKey>;
}

export function defineBoxInsetProperties<
  TZeroValueKey extends string | number,
  TDefaultSpacingKey extends string | number,
  TNegativeSpacingKey extends string | number,
  THalfSpacingKey extends string | number,
  THalfNegativeSpacingKey extends string | number,
  TMediaQueryKey extends string | number
>({
  spacingScale,
  mediaQueries,
}: DefineBoxInsetParams<
  TZeroValueKey,
  TDefaultSpacingKey,
  TNegativeSpacingKey,
  THalfSpacingKey,
  THalfNegativeSpacingKey,
  TMediaQueryKey
>) {
  const insetValues = {
    ...defaultSizes,
    ...spacingScale.default,
    ...spacingScale.negative,
    ...spacingScale.half,
    ...spacingScale.halfNegative,
    ...spacingScale.zeroValue,
  };

  const boxInsetProperties = defineProperties({
    ...getConditionsFromMedia<TMediaQueryKey>({
      mediaQueries: mediaQueries.orderedRecord,
      defaultMediaQueryKey: mediaQueries.defaultKey,
    }),
    properties: {
      insetBlockStart: insetValues,
      insetBlockEnd: insetValues,
      insetInlineStart: insetValues,
      insetInlineEnd: insetValues,
    },
    shorthands: {
      inset: [
        'insetBlockStart',
        'insetBlockEnd',
        'insetInlineStart',
        'insetInlineEnd',
      ],
      insetInline: ['insetInlineStart', 'insetInlineEnd'],
      insetBlock: ['insetBlockStart', 'insetBlockEnd'],
    },
  });

  return { boxPaddingProperties: boxInsetProperties };
}
