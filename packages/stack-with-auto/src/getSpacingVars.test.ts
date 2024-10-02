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

const numberSpacingScale = {
  0: '0',
  1: '100px',
  2: '200px',
  3: '300px',
  4: '400px',
};

test('getSpacingVars handles string case', () => {
  expect(getSpacingVars({ vars, prop: '1', spacingScale })).toStrictEqual({
    defaultVar: '10px',
    smVar: '10px',
    mdVar: '10px',
  });
});

test('getSpacingVars handles number case', () => {
  expect(
    // @ts-expect-error aff
    getSpacingVars({ vars, prop: 1, spacingScale: numberSpacingScale })
  ).toStrictEqual({
    defaultVar: '100px',
    smVar: '100px',
    mdVar: '100px',
  });
});

test('getSpacingVars handles array case', () => {
  expect(
    getSpacingVars({ vars, prop: ['1', null, '2'], spacingScale })
  ).toStrictEqual({
    defaultVar: '10px',
    smVar: '10px',
    mdVar: '20px',
  });
  expect(
    getSpacingVars({
      vars,
      prop: [1, null, 2],
      spacingScale: numberSpacingScale,
    })
  ).toStrictEqual({
    defaultVar: '100px',
    smVar: '100px',
    mdVar: '200px',
  });
  expect(
    getSpacingVars({ vars, prop: ['1', '2'], spacingScale })
  ).toStrictEqual({
    defaultVar: '10px',
    smVar: '20px',
    mdVar: '20px',
  });
  expect(
    getSpacingVars({ vars, prop: [1, 2], spacingScale: numberSpacingScale })
  ).toStrictEqual({
    defaultVar: '100px',
    smVar: '200px',
    mdVar: '200px',
  });
});

test('getSpacingVars handles object case', () => {
  expect(
    getSpacingVars({ vars, prop: { default: '1' }, spacingScale })
  ).toStrictEqual({
    defaultVar: '10px',
    smVar: '10px',
    mdVar: '10px',
  });
  expect(
    getSpacingVars({
      vars,
      prop: { default: 1 },
      spacingScale: numberSpacingScale,
    })
  ).toStrictEqual({
    defaultVar: '100px',
    smVar: '100px',
    mdVar: '100px',
  });
  expect(
    getSpacingVars({ vars, prop: { default: '1', sm: '2' }, spacingScale })
  ).toStrictEqual({
    defaultVar: '10px',
    smVar: '20px',
    mdVar: '20px',
  });
  expect(
    getSpacingVars({
      vars,
      prop: { default: 1, md: 2 },
      spacingScale: numberSpacingScale,
    })
  ).toStrictEqual({
    defaultVar: '100px',
    smVar: '100px',
    mdVar: '200px',
  });
});

test('getSpacingVars handles if we have too few vars', () => {
  expect(
    getSpacingVars({
      vars,
      prop: { default: '1', sm: '2', md: '3', lg: '4' } as any,
      spacingScale,
    })
  ).toStrictEqual({
    defaultVar: '10px',
    smVar: '20px',
    mdVar: '30px',
  });
  expect(
    getSpacingVars({
      vars,
      prop: { default: 1, sm: 2, md: 3, lg: 4 } as any,
      spacingScale: numberSpacingScale,
    })
  ).toStrictEqual({
    defaultVar: '100px',
    smVar: '200px',
    mdVar: '300px',
  });
  expect(
    getSpacingVars({
      vars,
      prop: { default: '1', lg: '4' } as any,
      spacingScale,
    })
  ).toStrictEqual({
    defaultVar: '10px',
    smVar: '10px',
    mdVar: '10px',
  });
  expect(
    getSpacingVars({
      vars,
      prop: { default: 1, lg: 4 } as any,
      spacingScale: numberSpacingScale,
    })
  ).toStrictEqual({
    defaultVar: '100px',
    smVar: '100px',
    mdVar: '100px',
  });
});
