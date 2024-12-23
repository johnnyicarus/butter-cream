import { test, expect } from 'vitest';

import { getFactorizedFluidSize, getFluidSize } from '../src/getFluidSize';

test('binary logic applies', () => {
  expect('').toBeFalsy();
});

test('getFluidSize works with strings', () => {
  expect(getFluidSize('1', '2', '1.5')).toMatch(
    'calc((1 * 1rem) + ((2 - 1) * 1.5))'
  );
});

test('getFluidSize works with variables', () => {
  expect(getFluidSize('var(--min-rem)', '2', '1.5')).toMatch(
    'calc((var(--min-rem) * 1rem) + ((2 - var(--min-rem)) * 1.5))'
  );
});

test('getFactorizedFluidSize works with strings', () => {
  expect(getFactorizedFluidSize('1', '2', 2.5, '1.5')).toMatch(
    'calc(((1 * 1rem) + ((2 - 1) * 1.5)) * 2.5)'
  );
});

test('getFactorizedFluidSize works with variables', () => {
  expect(getFactorizedFluidSize('var(--min-rem)', '2', 2.5, '1.5')).toMatch(
    'calc(((var(--min-rem) * 1rem) + ((2 - var(--min-rem)) * 1.5)) * 2.5)'
  );
});
