import { getSpacingVars } from './getSpacingVars';

const vars = {
  default: 'defaultVar',
  sm: 'smVar',
  md: 'mdVar',
} as const;

const spacingScale = {
  '0': '0',
  '1': '10px',
  '2': '20px',
  '3': '30px',
  '4': '40px',
};

test('getSpacingVars handles string case', () => {
  expect(getSpacingVars({ vars, prop: '1', spacingScale })).toStrictEqual({
    defaultVar: '10px',
    smVar: '10px',
    mdVar: '10px',
  });
});

test('getSpacingVars handles array case', () => {
  expect(
    getSpacingVars({ vars, prop: ['1', null, '2'], spacingScale }),
  ).toStrictEqual({
    defaultVar: '10px',
    smVar: '10px',
    mdVar: '20px',
  });
  expect(
    getSpacingVars({ vars, prop: ['1', '2'], spacingScale }),
  ).toStrictEqual({
    defaultVar: '10px',
    smVar: '20px',
    mdVar: '20px',
  });
});

test('getSpacingVars handles object case', () => {
  expect(
    getSpacingVars({ vars, prop: { default: '1' }, spacingScale }),
  ).toStrictEqual({
    defaultVar: '10px',
    smVar: '10px',
    mdVar: '10px',
  });
  expect(
    getSpacingVars({ vars, prop: { default: '1', sm: '2' }, spacingScale }),
  ).toStrictEqual({
    defaultVar: '10px',
    smVar: '20px',
    mdVar: '20px',
  });
  expect(
    getSpacingVars({ vars, prop: { default: '1', md: '2' }, spacingScale }),
  ).toStrictEqual({
    defaultVar: '10px',
    smVar: '10px',
    mdVar: '20px',
  });
});

test('getSpacingVars handles if we have too few vars', () => {
  expect(
    getSpacingVars({
      vars,
      prop: { default: '1', sm: '2', md: '3', lg: '4' } as any,
      spacingScale,
    }),
  ).toStrictEqual({
    defaultVar: '10px',
    smVar: '20px',
    mdVar: '30px',
  });
  expect(
    getSpacingVars({
      vars,
      prop: { default: '1', lg: '4' } as any,
      spacingScale,
    }),
  ).toStrictEqual({
    defaultVar: '10px',
    smVar: '10px',
    mdVar: '10px',
  });
});
