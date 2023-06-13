import { defineProperties } from '@vanilla-extract/sprinkles';

import { globals } from '../../core/src/globals';
import { defaultSizes } from './defaultSizes';
import { getConditionsFromMedia } from '../../core/src/getConditionsFromMedia';

interface BoxSpacingScale<
  T extends string | number,
  P extends string | number,
  Q extends string | number,
  R extends string | number,
  S extends string | number,
> {
  zeroValue: Record<T, string | number>;
  default: Record<P, string | number>;
  negative: Record<Q, string | number>;
  half: Record<R, string | number>;
  halfNegative: Record<S, string | number>;
}

interface CreateBoxParams<
  P extends string | number,
  Q extends string | number,
  R extends string | number,
  S extends string | number,
  T extends string | number,
  U extends string | number,
  V extends string | number,
> {
  spacingScale: BoxSpacingScale<V, P, Q, R, S>;
  zIndexScale: Record<T, string | number>;
  mediaQueries: Record<U, string | number>;
  defaultMediaQueryKey: U;
}

export function createBoxStyles<
  P extends string | number,
  Q extends string | number,
  R extends string | number,
  S extends string | number,
  T extends string | number,
  U extends string | number,
  V extends string | number,
>({
  spacingScale,
  zIndexScale,
  mediaQueries,
  defaultMediaQueryKey,
}: CreateBoxParams<P, Q, R, S, T, U, V>) {
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
    ...getConditionsFromMedia<U>({
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
