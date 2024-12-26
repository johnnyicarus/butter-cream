import type { GlobalStyleRule } from '@vanilla-extract/css';
import type { Viewport } from './config.types';
import type { CSSVarFunction } from './defineSpacingStyles';

type MapViewportParams = {
  minDefaultSize: CSSVarFunction;
  maxDefaultSize: CSSVarFunction;
  minViewportWidth: CSSVarFunction;
  maxViewportWidth: CSSVarFunction;
  viewport: Viewport;
};

export function mapViewports({
  minDefaultSize,
  maxDefaultSize,
  minViewportWidth,
  maxViewportWidth,
  viewport,
}: MapViewportParams) {
  return [
    viewport.query,
    {
      vars: {
        [minViewportWidth]: viewport.minViewportWidth,
        [maxViewportWidth]: viewport.maxViewportWidth,
        [minDefaultSize]: viewport.minDefaultSize,
        [maxDefaultSize]: viewport.maxDefaultSize,
      },
    },
  ];
}
