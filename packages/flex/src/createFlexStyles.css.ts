import { defineProperties } from '@vanilla-extract/sprinkles';

import { globals } from '../../core/src/globals';
import { getConditionsFromMedia } from '../../core/src/getConditionsFromMedia';
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
        'flex-start',
        'center',
        'flex-end',
        'stretch',
        'baseline',
        'auto',
      ],
      columnGap: spacing,
      rowGap: spacing,
      flexWrap: [...globals, 'wrap', 'nowrap'],
    },
    shorthands: {
      gap: ['columnGap', 'rowGap'],
    },
  });

  return { flexBaseStyles, flexProperties };
}
