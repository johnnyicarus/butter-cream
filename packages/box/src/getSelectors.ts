import { getDensitySelector } from './getDensitySelector';

// TODO Core
export type CSSVarFunction =
  | `var(--${string})`
  | `var(--${string}, ${string | number})`;

export function getSelectors<TSpacingKey extends string>(
  spacingScale: Record<TSpacingKey, string | number>,
  boxPaddingDensityModifier: string,
  boxPaddingFar: CSSVarFunction,
  boxPaddingNear: CSSVarFunction
) {
  const spacings = Object.values(spacingScale).reverse();

  const selectors = spacings
    .filter((_, index, array) => {
      return index !== 0 && index !== array.length - 1;
    })
    .map((value, index, array) => {
      const selector = getDensitySelector(index, boxPaddingDensityModifier);

      return [
        selector,
        {
          vars: {
            [boxPaddingFar]: value,
            [boxPaddingNear]: spacings[index + 2],
          },
        },
      ];
    });

  return { selectors: Object.fromEntries(selectors) };
}
