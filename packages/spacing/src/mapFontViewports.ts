import type { GlobalStyleRule } from '@vanilla-extract/css';
import type { Config, ResponsiveFontViewport } from './config.types';
import type { CSSVarFunction } from './defineSpacingStyles';

type MapFontViewportParams<TMediaQueryKey extends string> = {
  config: Config<TMediaQueryKey>;
  entry: [string, ResponsiveFontViewport];
  minSizeFont: CSSVarFunction;
  maxSizeFont: CSSVarFunction;
};

export function mapFontViewports<TMediaQueryKey extends string>({
  config,
  entry: [queryKey, viewport],
  minSizeFont,
  maxSizeFont,
}: MapFontViewportParams<TMediaQueryKey>) {
  const query = config.viewports[queryKey as TMediaQueryKey].query;

  return [
    query,
    {
      vars: {
        [minSizeFont]: viewport.minCapHeight,
        [maxSizeFont]: viewport.maxCapHeight,
      },
    },
  ];
}
