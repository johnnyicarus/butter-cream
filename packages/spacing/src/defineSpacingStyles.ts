import { createVar, type ComplexStyleRule } from '@vanilla-extract/css';
import type { Config } from './config.types';
import { mapDefaultSpacing } from './mapDefaultSpacing';
import { mapFonts } from './mapFonts';
import { mapSpacings } from './mapSpacings';
import { merge } from 'lodash-es';

export type CSSVarFunction =
  | `var(--${string})`
  | `var(--${string}, ${string | number})`;

type DefineSpacingStylesParams<T extends string> = {
  config: Config<T>;
  createVar: (debugId?: string) => CSSVarFunction;
  style: (rule: ComplexStyleRule, debugId?: string) => string;
};

export function defineSpacingStyles<TMediaQueryKey extends string>(
  config: Config<TMediaQueryKey>
) {
  // Initialize return values
  // const spacingVariableMap: Record<string, string> = {}; // TODO Key type
  // const spacingFontSizeClasses: Record<string, string> = {}; // TODO Key type
  // let spacingGlobalStyleRule: GlobalStyleRule = {};

  const {
    fluidFactorSecondOrder,
    spacingFontSizeClasses,
    spacingGlobalStyleRule,
    spacingVariableMap,
  } = mapDefaultSpacing({ config });

  config.spacings.forEach((spacing) => {
    const { spacingGlobalStyleRule: glo, spacingVariableMap: spa } =
      mapSpacings({
        config,
        fluidFactorSecondOrder,
        spacing,
      });

    merge(spacingGlobalStyleRule, glo);
    merge(spacingVariableMap, spa);
  });

  config.fonts.forEach((font) => {
    const { fontSizeClasses, globalStyle } = mapFonts({
      config,
      fluidFactorSecondOrder,
      font,
    });

    merge(spacingGlobalStyleRule, globalStyle);
    merge(spacingFontSizeClasses, fontSizeClasses);
  });

  return {
    spacingGlobalStyleRule,
    spacingVariableMap,
    spacingFontSizeClasses,
  };
}
