import { calc } from '@vanilla-extract/css-utils';

export function getFluidSize(
  minRem: string,
  maxRem: string,
  fluidFactor: string
) {
  return calc.add(
    calc.multiply(minRem, '1rem'),
    calc.multiply(calc.subtract(maxRem, minRem), fluidFactor)
  );
}

export function getFactorizedFluidSize(
  minRem: string,
  maxRem: string,
  unitFactor: number,
  fluidFactor: string
) {
  return calc.multiply(
    calc.add(
      calc.multiply(minRem, '1rem'),
      calc.multiply(calc.subtract(maxRem, minRem), fluidFactor)
    ),
    unitFactor
  );
}
