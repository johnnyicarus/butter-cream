import { defineProperties } from '@vanilla-extract/sprinkles';

import { getConditionsFromMedia, globals } from '@butter-cream/core';
import { style } from '@vanilla-extract/css';

interface FlexSpacingScale<
  ZeroValueKey extends string | number,
  DefaultSpacingKeys extends string | number,
> {
  zeroValue: Record<ZeroValueKey, string | number>;
  default: Record<DefaultSpacingKeys, string | number>;
}

interface CreateFlexParams<
  ZeroValueKey extends string | number,
  DefaultSpacingKeys extends string | number,
  MediaQueryKeys extends string | number,
> {
  spacingScale: FlexSpacingScale<ZeroValueKey, DefaultSpacingKeys>;
  mediaQueries: Record<MediaQueryKeys, string | number>;
  defaultMediaQueryKey: MediaQueryKeys;
}

export function createFlexStyles<
  ZeroValueKey extends string | number,
  DefaultSpacingKeys extends string | number,
  MediaQueryKeys extends string | number,
>({
  spacingScale,
  mediaQueries,
  defaultMediaQueryKey,
}: CreateFlexParams<ZeroValueKey, DefaultSpacingKeys, MediaQueryKeys>) {
  const flexBaseStyles = style({
    display: 'flex',
  });

  const spacing = {
    ...spacingScale.zeroValue,
    ...spacingScale.default,
  };

  const flexProperties = defineProperties({
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
