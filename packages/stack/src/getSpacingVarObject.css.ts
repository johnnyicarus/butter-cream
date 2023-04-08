import { CSSProperties } from '@vanilla-extract/css';
import { isValidKey } from '../../core/src/isValidKey';

type SpacingVarParams<P extends string> = {
  defaultMediaQueryKey: string;
  mediaQueries: Record<P, string>;
  varMap: Record<P, string>;
};

export function getSpacingVarObject<P extends string>({
  defaultMediaQueryKey,
  mediaQueries,
  varMap,
}: SpacingVarParams<P>) {
  const mediaObject = Object.keys(mediaQueries)
    .filter((key) => key !== defaultMediaQueryKey)
    .reduce<Record<P, CSSProperties>>((accumulator, current) => {
      if (isValidKey(current, mediaQueries)) {
        const mediaQuery = mediaQueries[current];
        if (mediaQuery) {
          const newAccumulator: Record<P, CSSProperties> = {
            ...accumulator,
            [mediaQueries[current]]: { marginBlockStart: varMap[current] },
          };
          return newAccumulator;
        }
        return accumulator;
      }
      return accumulator;
    }, {} as Record<P, CSSProperties>);

  return mediaObject;
}
