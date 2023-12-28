import { defineProperties } from '@vanilla-extract/sprinkles';

import { getConditionsFromMedia, globals } from '@butter-cream/core';
import { defaultSizes } from './defaultSizes';

interface BoxSpacingScale<
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

interface CreateBoxParams<
  TMediaQueryKey extends string | number,
  TZeroValueKey extends string | number,
  TDefaultSpacingKey extends string | number,
  TNegativeSpacingKey extends string | number,
  THalfSpacingKey extends string | number,
  THalfNegativeSpacingKey extends string | number,
  TZIndexKey extends string | number,
  TContainerKey extends string | number
> {
  spacingScale: BoxSpacingScale<
    TZeroValueKey,
    TDefaultSpacingKey,
    TNegativeSpacingKey,
    THalfSpacingKey,
    THalfNegativeSpacingKey
  >;
  zIndexScale: Record<TZIndexKey, string | number>;
  mediaQueries: Record<TMediaQueryKey, string | number>;
  defaultMediaQueryKey: TMediaQueryKey;
  containerSizeScale: Record<TContainerKey, string | number>;
}

export function createBoxStyles<
  TMediaQueryKey extends string | number,
  TZeroValueKey extends string | number,
  TDefaultSpacingKey extends string | number,
  TNegativeSpacingKey extends string | number,
  THalfSpacingKey extends string | number,
  THalfNegativeSpacingKey extends string | number,
  TZIndexKey extends string | number,
  TContainerKey extends string | number
>({
  spacingScale,
  zIndexScale,
  mediaQueries,
  defaultMediaQueryKey,
  containerSizeScale,
}: CreateBoxParams<
  TMediaQueryKey,
  TZeroValueKey,
  TDefaultSpacingKey,
  TNegativeSpacingKey,
  THalfSpacingKey,
  THalfNegativeSpacingKey,
  TZIndexKey,
  TContainerKey
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
    ...getConditionsFromMedia<TMediaQueryKey>({
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
      maxWidth: {
        ...sizeLimitValues,
        ...containerSizeScale,
      },

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
