import {
  createVar,
  type ComplexStyleRule,
  type GlobalStyleRule,
} from '@vanilla-extract/css';
import type { Config } from './config.types';

type CSSVarFunction =
  | `var(--${string})`
  | `var(--${string}, ${string | number})`;

type DefineSpacingStylesParams<T extends string> = {
  config: Config<T>;
  createVar: (debugId?: string) => CSSVarFunction;
  style: (rule: ComplexStyleRule, debugId?: string) => string;
};

export function defineSpacingStyles<T extends string>(config: Config<T>) {
  const spacingVariableMap: Record<string, string> = {}; // TODO Key type

  const spacingFontStyleClasses: Record<string, string> = {}; // TODO Key type

  let spacingGlobalStyleRule: GlobalStyleRule = {};

  const paddingDefault = createVar();

  spacingVariableMap[config.defaultSpacingName] = paddingDefault;

  spacingGlobalStyleRule = {
    ...spacingGlobalStyleRule,
    vars: {
      ...spacingGlobalStyleRule.vars,
      [paddingDefault]: '1rem',
    },
  };

  return {
    spacingGlobalStyleRule,
    spacingVariableMap,
    spacingFontStyleClasses,
  };
}
