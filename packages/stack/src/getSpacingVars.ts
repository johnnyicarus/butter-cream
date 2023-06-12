import { SpaceProp } from './SpaceProp';

interface GetSpacingVars<M extends string, S extends string | number> {
  vars: Record<M, string>;
  prop: SpaceProp<M, S>;
  spacingScale: Record<S, string>;
}

export function getSpacingVars<M extends string, S extends string | number>({
  vars,
  prop,
  spacingScale,
}: GetSpacingVars<M, S>): Record<string, string> {
  if (!prop) {
    return {};
  }
  if (typeof prop === 'string') {
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
        () => null,
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
        acc[vars[curr as M]] = (spacingScale as Record<string, string>)[
          scaleKey
        ];
      } else {
        const replaceKey = propArray
          .slice(0, index)
          .reverse()
          .find((key) => (prop as Record<string, string>)[key]);
        propArray.reverse();
        if (replaceKey) {
          const scaleKey = (prop as Record<string, string>)[replaceKey];
          acc[vars[curr as M]] = (spacingScale as Record<string, string>)[
            scaleKey
          ];
        }
      }
      return acc;
    },
    {},
  );
}
