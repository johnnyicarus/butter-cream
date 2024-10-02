import { type GlobalStyleRule, style } from '@vanilla-extract/css';
import { getVarMap } from './getVarMap.css';
import { getSpacingVarObject } from './getSpacingVarObject.css';
import { defineProperties } from '@vanilla-extract/sprinkles';
import { getConditionsFromMedia, globals } from '@butter-cream/core';

interface CreateStackParams<M extends string> {
  mediaQueries: Record<M, string>;
  defaultMediaQueryKey: M;
}

export type GlobalStyleMap = Record<
  string,
  { selector: string; rule: GlobalStyleRule }
>;

export function createStackStyles<M extends string>({
  defaultMediaQueryKey,
  mediaQueries,
}: CreateStackParams<M>) {
  const stackBaseStyles = style({});

  const stackVarMap = getVarMap(mediaQueries);

  const stackGlobalStyleMap: GlobalStyleMap = {
    sleepyOwl: {
      selector: `${stackBaseStyles} > * + *`,
      rule: {
        marginBlockStart: stackVarMap[defaultMediaQueryKey],

        '@media': {
          ...getSpacingVarObject<M>({
            mediaQueries,
            defaultMediaQueryKey,
            varMap: stackVarMap,
          }),
        },
      },
    },
    onlyChildHelper: {
      selector: `${stackBaseStyles}:only-child`,
      rule: {
        blockSize: '100%',
      },
    },
  };

  const stackProperties = defineProperties({
    ...getConditionsFromMedia<M>({
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
    },
  });

  return {
    stackBaseStyles,
    stackGlobalStyleMap,
    stackVarMap,
    stackProperties,
  };
}
