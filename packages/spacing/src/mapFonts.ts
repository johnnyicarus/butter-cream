import { createVar, style, type GlobalStyleRule } from '@vanilla-extract/css';
import type { Config, ResponsiveFont } from './config.types';
import type { CSSVarFunction } from './defineSpacingStyles';
import { getFactorizedFluidSize } from './getFluidSize';
import { calc } from '@vanilla-extract/css-utils';
import { mapFontViewports } from './mapFontViewports';

type MapFontParams<TMediaQueryKey extends string> = {
  config: Config<TMediaQueryKey>;
  fluidFactorSecondOrder: CSSVarFunction;
  font: ResponsiveFont<TMediaQueryKey>;
};

export function mapFonts<TMediaQueryKey extends string>({
  config,
  fluidFactorSecondOrder,
  font,
}: MapFontParams<TMediaQueryKey>) {
  const minSizeFont = createVar();
  const maxSizeFont = createVar();
  const fluidSizeFont = createVar();

  const viewports = Object.entries(font.viewports)
    .filter(([queryKey]) => queryKey !== 'default')
    .map((entry) =>
      mapFontViewports({
        config,
        entry,
        minSizeFont,
        maxSizeFont,
      })
    );

  return {
    fontSizeClasses: {
      [font.name]: style({
        // fontSize: fluidSizeFont,
        // Min-size does not work when using this
        fontSize: `clamp(
        ${calc.multiply(minSizeFont, `${config.fontSizeToCapHeightRatio}rem`)},
        ${fluidSizeFont},
        ${calc.multiply(maxSizeFont, `${config.fontSizeToCapHeightRatio}rem`)}
      )`,
        lineHeight: calc.divide(font.lineHeight, font.fontSize),

        selectors: {
          '&::before': {
            content: '',
            display: 'table',
            marginBottom: font.capHeightTrim,
          },

          '&::after': {
            content: '',
            display: 'table',
            marginTop: font.baselineTrim,
          },
        },
      }),
    },
    globalStyle: {
      vars: {
        [minSizeFont]: font.viewports.default.minCapHeight,
        [maxSizeFont]: font.viewports.default.maxCapHeight,
        [fluidSizeFont]: getFactorizedFluidSize(
          minSizeFont,
          maxSizeFont,
          config.fontSizeToCapHeightRatio, // TODO Param
          fluidFactorSecondOrder
        ),
      },
      '@media': Object.fromEntries(viewports),
    },
  };
}
