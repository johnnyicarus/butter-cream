import { createVar, type GlobalStyleRule } from '@vanilla-extract/css';
import type { Config, Spacing } from './config.types';
import type { CSSVarFunction } from './defineSpacingStyles';
import { getFluidSize } from './getFluidSize';
import { mapSpacingViewports } from './mapSpacingViewports';

type MapSpacingParams<TMediaQueryKey extends string> = {
  config: Config<TMediaQueryKey>;
  fluidFactorSecondOrder: CSSVarFunction;
  spacing: Spacing<TMediaQueryKey>;
};

export function mapSpacings<TMediaQueryKey extends string>({
  config,
  fluidFactorSecondOrder,
  spacing,
}: MapSpacingParams<TMediaQueryKey>) {
  const minSpacing = createVar();
  const maxSpacing = createVar();
  const fluidSpacing = createVar();
  const paddingStep = createVar();

  const viewports = Object.entries(spacing.viewports)
    .filter(([queryKey]) => queryKey !== 'default')
    .map((entry) =>
      mapSpacingViewports({
        config,
        entry,
        minSpacing,
        maxSpacing,
      })
    );

  return {
    spacingVariableMap: {
      [spacing.name]: paddingStep,
    },
    spacingGlobalStyleRule: {
      vars: {
        [minSpacing]: spacing.viewports.default.minSpacing,
        [maxSpacing]: spacing.viewports.default.maxSpacing,
        [fluidSpacing]: getFluidSize(
          minSpacing,
          maxSpacing,
          fluidFactorSecondOrder
        ),
        [paddingStep]: fluidSpacing,
      },
      '@media': Object.fromEntries(viewports),
    },
  };
}
