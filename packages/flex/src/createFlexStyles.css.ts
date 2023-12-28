import { defineProperties } from '@vanilla-extract/sprinkles';

import { getConditionsFromMedia, globals } from '@butter-cream/core';
import { style } from '@vanilla-extract/css';

interface FlexSpacingScale<
  TZeroValueKey extends string | number,
  TDefaultSpacingKey extends string | number
> {
  zeroValue: Record<TZeroValueKey, string | number>;
  default: Record<TDefaultSpacingKey, string | number>;
}

interface CreateFlexParams<
  TMediaQueryKey extends string,
  TZeroValueKey extends string | number,
  TDefaultSpacingKey extends string | number
> {
  mediaQueries: Record<TMediaQueryKey, string | number>;
  defaultMediaQueryKey: TMediaQueryKey;
  spacingScale: FlexSpacingScale<TZeroValueKey, TDefaultSpacingKey>;
}

export function createFlexStyles<
  TMediaQueryKey extends string,
  TZeroValueKey extends string | number,
  TDefaultSpacingKey extends string | number
>({
  defaultMediaQueryKey,
  mediaQueries,
  spacingScale,
}: CreateFlexParams<TMediaQueryKey, TZeroValueKey, TDefaultSpacingKey>) {
  const flexBaseStyles = style({
    display: 'flex',
  });

  const spacing = {
    ...spacingScale.zeroValue,
    ...spacingScale.default,
  };

  const flexProperties = defineProperties({
    ...getConditionsFromMedia<TMediaQueryKey>({
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
        'normal',
        'flex-start',
        'center',
        'flex-end',
        'stretch',
        'baseline',
        'auto',
        'space-around',
        'space-between',
        'space-evenly',
      ],
      columnGap: spacing,
      rowGap: spacing,
      flexWrap: [...globals, 'wrap', 'nowrap'],
      flexDirection: [
        ...globals,
        'column',
        'column-reverse',
        'row',
        'row-reverse',
      ],
    },
    shorthands: {
      gap: ['columnGap', 'rowGap'],
    },
  });

  return { flexBaseStyles, flexProperties };
}
