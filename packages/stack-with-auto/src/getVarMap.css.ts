import { createVar } from '@vanilla-extract/css';
import { isValidKey } from '../../core/src/isValidKey';

export function getVarMap<M extends string | number>(
  mediaQueries: Record<M, string>,
) {
  return Object.keys(mediaQueries).reduce<Record<M, string>>(
    (accumulator, current) => {
      if (isValidKey<M>(current, mediaQueries)) {
        accumulator[current] = createVar();
      }
      return accumulator;
    },
    {} as Record<M, string>,
  );
}
