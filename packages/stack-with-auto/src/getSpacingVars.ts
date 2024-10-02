/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import type { SpaceProp } from './SpaceProp';

interface GetSpacingVars<
  TMediaQueryKey extends string,
  TSpacingScaleKey extends string | number
> {
  vars: Record<TMediaQueryKey, string>;
  prop: SpaceProp<TMediaQueryKey, TSpacingScaleKey>;
  spacingScale: Record<TSpacingScaleKey, string>;
}

export function getSpacingVars<
  TMediaQueryKey extends string,
  TSpacingScaleKey extends string | number
>({
  vars,
  prop,
  spacingScale,
}: GetSpacingVars<TMediaQueryKey, TSpacingScaleKey>): Record<string, string> {
  if (!prop) {
    return {};
  }
  if (typeof prop === 'string' || typeof prop === 'number') {
    return Object.values(vars)
      .filter((v) => v)
      .reduce<Record<string, string>>((acc, current) => {
        acc[current as string] = spacingScale[prop];
        return acc;
      }, {});
  }
  if (Array.isArray(prop)) {
    return [
      ...prop,
      ...Array.from(
        { length: Object.keys(vars).length - prop.length },
        () => null
      ),
    ]
      .map((p, index) => {
        if (!p) {
          if (index >= prop.length) {
            return prop.reverse().find((p) => p);
          }
          return prop
            .slice(0, index)
            .reverse()
            .find((p) => p);
        }
        return p;
      })
      .reduce<Record<string, string>>((acc, current, index) => {
        const varsArray = Object.values(vars);
        if (current) {
          acc[varsArray[index] as string] = spacingScale[current];
        }
        return acc;
      }, {});
  }
  const propArray = Object.keys(prop);
  return Object.keys(vars).reduce<Record<string, string>>(
    (acc, curr, index) => {
      if ((prop as Record<string, string>)[curr]) {
        const scaleKey = (prop as Record<string, string>)[curr];
        acc[vars[curr as TMediaQueryKey]] =
          // @ts-expect-error pls
          (spacingScale as Record<string, string>)[scaleKey];
      } else {
        const replaceKey = propArray
          .slice(0, index)
          .reverse()
          .find((key) => (prop as Record<string, string>)[key]);
        propArray.reverse();
        if (replaceKey) {
          const scaleKey = (prop as Record<string, string>)[replaceKey];
          acc[vars[curr as TMediaQueryKey]] =
            // @ts-expect-error pls
            (spacingScale as Record<string, string>)[scaleKey];
        }
      }
      return acc;
    },
    {}
  );
}
