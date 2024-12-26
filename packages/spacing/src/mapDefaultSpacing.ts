import { createVar, style, type GlobalStyleRule } from '@vanilla-extract/css';
import type { Config, Viewport } from './config.types';
import { calc } from '@vanilla-extract/css-utils';
import { mapViewports } from './mapViewports';

type MapDefaultSpacingParams<TMediaQueryKey extends string> = {
  config: Config<TMediaQueryKey>;
};

export function mapDefaultSpacing<TMediaQueryKey extends string>({
  config,
}: MapDefaultSpacingParams<TMediaQueryKey>) {
  const minViewportWidth = createVar();
  const maxViewportWidth = createVar();

  const minDefaultSize = createVar();
  const maxDefaultSize = createVar();
  const minDefaultSizeRem = createVar();
  const maxDefaultSizeRem = createVar();

  const minWidthRemInitial = createVar();
  const maxWidthRemInitial = createVar();
  const minWidthRemDerived = createVar();
  const maxWidthRemDerived = createVar();

  const fluidFactor = createVar();
  const fluidFactorSecondOrder = createVar();

  const fluidSize = createVar();

  const paddingDefault = createVar();

  const viewports = Object.values<Viewport>(config.viewports).map((viewport) =>
    mapViewports({
      minDefaultSize,
      maxDefaultSize,
      minViewportWidth,
      maxViewportWidth,
      viewport,
    })
  );

  const media = Object.fromEntries(viewports);

  return {
    fluidFactorSecondOrder,
    spacingFontSizeClasses: {
      body: style({
        fontSize: `${config.fontSizeToCapHeightRatio}rem`, // TODO? Use var
      }),
      [config.defaultFont.name]: style({
        fontSize: `${config.fontSizeToCapHeightRatio}rem`, // TODO? Use var
        lineHeight: calc.divide(
          config.defaultFont.lineHeight,
          config.defaultFont.fontSize
        ),

        selectors: {
          '&::before': {
            content: '',
            display: 'table',
            marginBottom: config.defaultFont.capHeightTrim,
          },

          '&::after': {
            content: '',
            display: 'table',
            marginTop: config.defaultFont.baselineTrim,
          },
        },
      }),
    },
    spacingGlobalStyleRule: {
      vars: {
        [paddingDefault]: '1rem',
        [minViewportWidth]: config.defaultViewport.minViewportWidth,
        [maxViewportWidth]: config.defaultViewport.maxViewportWidth,

        // What we want 1rem to be in px at minViewportWidth/maxViewportWidth
        [minDefaultSize]: config.defaultViewport.minDefaultSize,
        [maxDefaultSize]: config.defaultViewport.maxDefaultSize,

        [minDefaultSizeRem]: calc.divide(minDefaultSize, 16),
        [maxDefaultSizeRem]: calc.divide(maxDefaultSize, 16),

        // Default viewport lower and upper limit
        // in rem (on the root element, so 1rem = 16px)
        [minWidthRemInitial]: calc.divide(minViewportWidth, 16),
        [maxWidthRemInitial]: calc.divide(maxViewportWidth, 16),

        // Default viewport lower and upper limit
        // in rem (on other elements, so minDefaulSize =< 1rem =< maxDefaultSize)
        [minWidthRemDerived]: calc.divide(minViewportWidth, minDefaultSize),
        [maxWidthRemDerived]: calc.divide(maxViewportWidth, maxDefaultSize),
        [fluidFactor]: calc.divide(
          calc.subtract('100vw', calc.multiply(minWidthRemInitial, '1rem')),
          calc.subtract(maxWidthRemInitial, minWidthRemInitial)
        ),
        [fluidFactorSecondOrder]: calc.divide(
          calc.subtract('100vw', calc.multiply(minWidthRemDerived, '1rem')),
          calc.subtract(maxWidthRemDerived, minWidthRemDerived)
        ),
        // Set 1rem to our
        [fluidSize]: calc.add(
          calc.multiply(minDefaultSizeRem, '1rem'),
          calc.multiply(
            calc.subtract(maxDefaultSizeRem, minDefaultSizeRem),
            fluidFactor
          )
        ),
      },

      // Set 1rem to our fluid size
      fontSize: `clamp(
        ${calc.multiply(minDefaultSizeRem, '1rem')},
        ${fluidSize},
        ${calc.multiply(maxDefaultSizeRem, '1rem')}
      )`,

      '@media': media,
    },
    spacingVariableMap: {
      [config.defaultSpacingName]: paddingDefault,
    },
  };
}
