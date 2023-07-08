import { defineProperties } from '@vanilla-extract/sprinkles';

import { globals } from '../../core/src/globals';
import { defaultSizes } from './defaultSizes';
import { getConditionsFromMedia } from '../../core/src/getConditionsFromMedia';

interface BoxSpacingScale<
  ZeroValueKey extends string | number,
  DefaultSpacingKeys extends string | number,
  NegativeSpacingKeys extends string | number,
  HalfSpacingKeys extends string | number,
  HalfNegativeSpacingKeys extends string | number,
> {
  zeroValue: Record<ZeroValueKey, string | number>;
  default: Record<DefaultSpacingKeys, string | number>;
  negative: Record<NegativeSpacingKeys, string | number>;
  half: Record<HalfSpacingKeys, string | number>;
  halfNegative: Record<HalfNegativeSpacingKeys, string | number>;
}

interface CreateBoxParams<
  DefaultSpacingKeys extends string | number,
  NegativeSpacingKeys extends string | number,
  HalfSpacingKeys extends string | number,
  HalfNegativeSpacingKeys extends string | number,
  ZIndexKeys extends string | number,
  MediaQueryKeys extends string | number,
  ZeroValueKey extends string | number,
> {
  spacingScale: BoxSpacingScale<
    ZeroValueKey,
    DefaultSpacingKeys,
    NegativeSpacingKeys,
    HalfSpacingKeys,
    HalfNegativeSpacingKeys
  >;
  zIndexScale: Record<ZIndexKeys, string | number>;
  mediaQueries: Record<MediaQueryKeys, string | number>;
  defaultMediaQueryKey: MediaQueryKeys;
}

export function createBoxStyles<
  DefaultSpacingKeys extends string | number,
  NegativeSpacingKeys extends string | number,
  HalfSpacingKeys extends string | number,
  HalfNegativeSpacingKeys extends string | number,
  ZIndexKeys extends string | number,
  MediaQueryKeys extends string | number,
  ZeroValueKey extends string | number,
>({
  spacingScale,
  zIndexScale,
  mediaQueries,
  defaultMediaQueryKey,
}: CreateBoxParams<
  DefaultSpacingKeys,
  NegativeSpacingKeys,
  HalfSpacingKeys,
  HalfNegativeSpacingKeys,
  ZIndexKeys,
  MediaQueryKeys,
  ZeroValueKey
>) {
  const paddingValues = spacingScale.default;
  const marginValues = {
    ...spacingScale.negative,
    ...spacingScale.halfNegative,
    auto: 'auto',
  };
  const sizeValues = {
    ...defaultSizes,
    ...spacingScale.zeroValue,
  };
  const sizeLimitValues = {
    ...defaultSizes,
    ...spacingScale.zeroValue,
    none: 'none',
  };
  const insetValues = {
    ...defaultSizes,
    ...spacingScale.default,
    ...spacingScale.negative,
    ...spacingScale.half,
    ...spacingScale.halfNegative,
    ...spacingScale.zeroValue,
  };

  const boxProperties = defineProperties({
    ...getConditionsFromMedia<MediaQueryKeys>({
      mediaQueries,
      defaultMediaQueryKey,
    }),
    properties: {
      position: ['static', 'absolute', 'fixed', 'relative', 'sticky'],
      display: ['none', 'block', 'inline', 'inline-block', 'flow-root'],
      alignSelf: [
        ...globals,
        'flex-start',
        'center',
        'flex-end',
        'stretch',
        'baseline',
        'auto',
      ],
      justifySelf: [
        ...globals,
        'flex-start',
        'center',
        'flex-end',
        'stretch',
        'baseline',
        'auto',
      ],
      flexGrow: ['0', '1'], // Adapted to # of max. columns
      flexShrink: ['0', '1'], // Adapted to # of max. columns
      flexBasis: { '0': '0', auto: 'auto', full: '100%' },
      overflowX: ['visible', 'hidden', 'scroll', 'clip', 'auto'],
      overflowY: ['visible', 'hidden', 'scroll', 'clip', 'auto'],
      cursor: [...globals, 'auto', 'default', 'pointer'],
      pointerEvents: ['none', 'auto'],

      zIndex: zIndexScale,

      paddingBlockStart: paddingValues,
      paddingBlockEnd: paddingValues,
      paddingInlineStart: paddingValues,
      paddingInlineEnd: paddingValues,

      marginBlockStart: marginValues,
      marginBlockEnd: marginValues,
      marginInlineStart: marginValues,
      marginInlineEnd: marginValues,

      width: {
        ...sizeValues,
        screen: '100vw',
      },
      height: {
        ...sizeValues,
        screen: '100vh',
      },
      minWidth: sizeLimitValues,
      maxWidth: sizeLimitValues,

      insetBlockStart: insetValues,
      insetBlockEnd: insetValues,
      insetInlineStart: insetValues,
      insetInlineEnd: insetValues,
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
      margin: [
        'marginBlockStart',
        'marginBlockEnd',
        'marginInlineStart',
        'marginInlineEnd',
      ],
      marginInline: ['marginInlineStart', 'marginInlineEnd'],
      marginBlock: ['marginBlockStart', 'marginBlockEnd'],
      overflow: ['overflowX', 'overflowY'],
      size: ['width', 'height'],
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

  return boxProperties;
}
