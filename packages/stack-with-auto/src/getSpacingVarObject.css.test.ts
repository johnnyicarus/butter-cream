import { getSpacingVarObject } from './getSpacingVarObject.css';

export const mediaQueries = {
  default: '',
  sm: '(min-width: 768px)',
  md: '(min-width: 1024px)',
};

const varMap = {
  default: 'defaultVariable',
  sm: 'smVariable',
  md: 'mdVariable',
};

const defaultMediaQueryKey = 'default';

test('getSpacingVars handles string case', () => {
  expect(
    getSpacingVarObject({
      defaultMediaQueryKey,
      mediaQueries,
      varMap,
    }),
  ).toStrictEqual({
    '(min-width: 768px)': { marginBlockStart: 'smVariable' },
    '(min-width: 1024px)': { marginBlockStart: 'mdVariable' },
  });
});
