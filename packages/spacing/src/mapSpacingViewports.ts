import type { GlobalStyleRule } from '@vanilla-extract/css';
import type { Config, SpacingViewport } from './config.types';
import type { CSSVarFunction } from './defineSpacingStyles';

type MapSpacingViewportParams<TMediaQueryKey extends string> = {
  config: Config<TMediaQueryKey>;
  entry: [string, SpacingViewport];
  minSpacing: CSSVarFunction;
  maxSpacing: CSSVarFunction;
};

export function mapSpacingViewports<TMediaQueryKey extends string>({
  config,
  entry: [queryKey, viewport],
  minSpacing,
  maxSpacing,
}: MapSpacingViewportParams<TMediaQueryKey>) {
  const query = config.viewports[queryKey as TMediaQueryKey].query;

  return [
    query,
    {
      vars: {
        [minSpacing]: viewport.minSpacing,
        [maxSpacing]: viewport.maxSpacing,
      },
    },
  ];
}
