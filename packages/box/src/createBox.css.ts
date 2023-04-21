import { defineProperties } from '@vanilla-extract/sprinkles';

import { globals } from '../../core/src/globals';
import { defaultSizes } from './defaultSizes';
import { getConditionsFromMedia } from '../../core/src/getConditionsFromMedia';

interface BoxSpacingScale<
  P extends string,
  Q extends string,
  R extends string,
  S extends string,
> {
  zeroValue: string | number;
  default: Record<P, string>;
  negative: Record<Q, string>;
  half: Record<R, string>;
  halfNegative: Record<S, string>;
}

interface CreateBoxParams<
  P extends string,
  Q extends string,
  R extends string,
  S extends string,
  T extends string,
  U extends string,
> {
  spacingScale: BoxSpacingScale<P, Q, R, S>;
  zIndexScale: Record<T, string>;
  mediaQueries: Record<U, string>;
  defaultMediaQueryKey: U;
}

export function createBox<
  P extends string,
  Q extends string,
  R extends string,
  S extends string,
  T extends string,
  U extends string,
>({
  spacingScale,
  zIndexScale,
  mediaQueries,
  defaultMediaQueryKey,
}: CreateBoxParams<P, Q, R, S, T, U>) {
  const paddingValues = spacingScale.default;
  const marginValues: Record<string, string> = {
    ...spacingScale.negative,
    ...spacingScale.halfNegative,
    auto: 'auto',
  };
  const sizeValues = {
    ...defaultSizes,
    0: spacingScale.zeroValue,
  };
  const sizeLimitValues = {
    ...defaultSizes,
    0: spacingScale.zeroValue,
    none: 'none',
  };
  const insetValues = {
    ...defaultSizes,
    ...spacingScale.default,
    ...spacingScale.negative,
    ...spacingScale.half,
    ...spacingScale.halfNegative,
    0: spacingScale.zeroValue,
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
        'paddingInlineStart',
      ],
      paddingX: ['paddingInlineStart', 'paddingInlineEnd'],
      paddingY: ['paddingBlockStart', 'paddingBlockEnd'],
      margin: [
        'marginBlockStart',
        'marginBlockEnd',
        'marginInlineStart',
        'marginInlineStart',
      ],
      marginX: ['marginInlineStart', 'marginInlineEnd'],
      marginY: ['marginBlockStart', 'marginBlockEnd'],
      overflow: ['overflowX', 'overflowY'],
      size: ['width', 'height'],
      inset: [
        'insetBlockStart',
        'insetBlockEnd',
        'insetInlineStart',
        'insetInlineEnd',
      ],
      insetX: ['insetInlineStart', 'insetInlineEnd'],
      insetY: ['insetBlockStart', 'insetBlockEnd'],
    },
  });

  return boxProperties;
}
