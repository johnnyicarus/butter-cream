import { defineProperties } from '@vanilla-extract/sprinkles';
import type { MediaQuerySettings } from './MediaQuerySettings';
import { globals } from '@butter-cream/core';

export interface DefineBoxBaseParams<TMediaQueryKey extends string | number> {
  mediaQueries: MediaQuerySettings<TMediaQueryKey>;
}

export function defineBoxBaseProperties() {
  const boxBaseProperties = defineProperties({
    properties: {
      position: [
        ...globals,
        'static',
        'absolute',
        'fixed',
        'relative',
        'sticky',
      ],
      display: [
        'none',
        'block',
        'flex',
        'flex-inline',
        'inline',
        'inline-block',
        'flow-root',
      ],
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
    },
    shorthands: {
      overflow: ['overflowX', 'overflowY'],
    },
  });

  return { boxBaseProperties };
}
