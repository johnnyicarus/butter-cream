import { GlobalStyleRule, style } from '@vanilla-extract/css';
import { getVarMap } from './getVarMap.css';
import { getSpacingVarObject } from './getSpacingVarObject.css';
import { defineProperties } from '@vanilla-extract/sprinkles';
import { getConditionsFromMedia } from '../../core/src/getConditionsFromMedia';
import { globals } from '../../core/src/globals';

interface CreateStackParams<M extends string> {
  mediaQueries: Record<M, string>;
  defaultMediaQueryKey: M;
  splitPossibilities: number;
}

type GlobalStyleMap = Record<
  string,
  { selector: string; rule: GlobalStyleRule }
>;

export function createStackStyles<M extends string>({
  defaultMediaQueryKey,
  mediaQueries,
  splitPossibilities,
}: CreateStackParams<M>) {
  const stackStyles = style({
    display: 'flex',
    flexDirection: 'column',
  });

  const stackSplitMap = Array.from(
    { length: splitPossibilities },
    (_, i) => i + 1,
  ).reduce<Record<number, string>>((accumulator, current) => {
    accumulator[current] = style({});
    return accumulator;
  }, {});

  const stackGlobalStyleMap = Object.values(
    stackSplitMap,
  ).reduce<GlobalStyleMap>((accumulator, style, index) => {
    const selector = `${style} > :nth-child(${index + 2})`;
    const rule = {
      marginBlockStart: 'auto',
    };
    accumulator[style] = {
      selector,
      rule,
    };
    return accumulator;
  }, {} as GlobalStyleMap);

  const stackVarMap = getVarMap(mediaQueries);

  stackGlobalStyleMap['sleepyOwl'] = {
    selector: `${stackStyles} > * + *`,
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
  };

  stackGlobalStyleMap['onlyChildHelper'] = {
    selector: `${stackStyles}:only-child`,
    rule: {
      blockSize: '100%',
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
    stackStyles,
    stackGlobalStyleMap,
    stackVarMap,
    stackSplitMap,
    stackProperties,
  };
}
