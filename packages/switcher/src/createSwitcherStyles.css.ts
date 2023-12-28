import { defineProperties } from '@vanilla-extract/sprinkles';
import { style } from '@vanilla-extract/css';

import { globals } from '../../core/src/globals';
import { getConditionsFromMedia } from '../../core/src/getConditionsFromMedia';
import type { GlobalStyleMap } from '../../stack/src/createStackStyles.css';

interface SwitcherSpacingScale<
  ZeroValueKey extends string | number,
  DefaultSpacingKeys extends string | number,
> {
  zeroValue: Record<ZeroValueKey, string | number>;
  default: Record<DefaultSpacingKeys, string | number>;
}

interface CreateSwitcherParams<
  ZeroValueKey extends string | number,
  DefaultSpacingKeys extends string | number,
  MediaQueryKeys extends string | number,
> {
  spacingScale: SwitcherSpacingScale<ZeroValueKey, DefaultSpacingKeys>;
  mediaQueries: Record<MediaQueryKeys, string | number>;
  defaultMediaQueryKey: MediaQueryKeys;
  threshold: string;
  limit: number;
}

export function createSwitcherStyles<
  ZeroValueKey extends string | number,
  DefaultSpacingKeys extends string | number,
  MediaQueryKeys extends string | number,
>({
  spacingScale,
  mediaQueries,
  defaultMediaQueryKey,
  threshold,
  limit,
}: CreateSwitcherParams<ZeroValueKey, DefaultSpacingKeys, MediaQueryKeys>) {
  const switcherBaseStyles = style({
    display: 'flex',
    flexWrap: 'wrap',
  });

  const spacing = {
    ...spacingScale.zeroValue,
    ...spacingScale.default,
  };

  const switcherGlobalStyles: GlobalStyleMap = {
    threshold: {
      selector: `.${switcherBaseStyles} > *`,
      rule: {
        flexGrow: 1,
        flexBasis: `calc((${threshold} - 100%) * 999);`,
      },
    },
    limit: {
      selector: `
        .${switcherBaseStyles} > :nth-last-child(n + ${limit + 1}),
        .${switcherBaseStyles} > :nth-last-child(n + ${limit + 1}) ~ *,
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
        'switcher-start',
        'center',
        'switcher-end',
        'stretch',
        'baseline',
        'auto',
      ],
      justifyContent: [
        ...globals,
        'switcher-start',
        'center',
        'switcher-end',
        'stretch',
        'baseline',
        'auto',
      ],
      columnGap: spacing,
      rowGap: spacing,
    },
    shorthands: {
      gap: ['columnGap', 'rowGap'],
    },
  });

  return { switcherBaseStyles, switcherGlobalStyles, switcherProperties };
}
