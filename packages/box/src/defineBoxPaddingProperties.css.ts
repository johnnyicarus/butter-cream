import { getConditionsFromMedia } from '@butter-cream/core';
import { createVar, style } from '@vanilla-extract/css';
import { defineProperties } from '@vanilla-extract/sprinkles';
import { getSelectors } from './getSelectors';
import type { MediaQuerySettings } from './MediaQuerySettings';

export interface DefineBoxPaddingParams<
  TSpacingKey extends string,
  TMediaQueryKey extends string
> {
  spacingScale: Record<TSpacingKey, string | number>;
  mediaQueries: MediaQuerySettings<TMediaQueryKey>;
}

export function defineBoxPaddingProperties<
  TSpacingKey extends string,
  TMediaQueryKey extends string
>({
  spacingScale,
  mediaQueries,
}: DefineBoxPaddingParams<TSpacingKey, TMediaQueryKey>) {
  const boxPaddingNear = createVar();
  const boxPaddingFar = createVar();

  const boxPaddingDensityModifier = style({});

  console.log(spacingScale);

  const spacings: (string | number)[] = Object.values(spacingScale);

  const boxPaddingDensityBase = style({
    vars: {
      [boxPaddingFar]: spacings[spacings.length - 1] as string,
      [boxPaddingNear]: spacings[spacings.length - 2] as string,
    },
    display: 'flex',
    flexDirection: 'column',
  });

  const boxPaddingDensity = getSelectors<TSpacingKey>(
    spacingScale,
    boxPaddingDensityModifier,
    boxPaddingFar,
    boxPaddingNear
  );

  const boxPaddingDensityStyles = style(boxPaddingDensity);

  const boxPaddingProperties = defineProperties({
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

  return {
    boxPaddingNear,
    boxPaddingFar,
    boxPaddingDensityBase,
    boxPaddingDensityModifier,
    boxPaddingDensityStyles,
    boxPaddingProperties,
  };
}
