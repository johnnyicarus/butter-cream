import { isValidKey } from './isValidKey';

interface ConditionsFromMediaParams<R extends string | number> {
  mediaQueries: Record<R, string | number>;
  defaultMediaQueryKey: R;
}

interface ConditionsFromMediaReturnType<R extends string | number> {
  conditions: Record<R, {} | { '@media': string }>;
  defaultCondition: R;
  responsiveArray: R[];
}

export function getConditionsFromMedia<R extends string | number>({
  mediaQueries,
  defaultMediaQueryKey,
}: ConditionsFromMediaParams<R>): ConditionsFromMediaReturnType<R> {
  const conditions = Object.entries<string | number>(mediaQueries).reduce<
    Record<R, {} | { '@media': string }>
  >((acc, [key, value]) => {
    if (isValidKey<R>(key, mediaQueries)) {
      if (key === defaultMediaQueryKey) {
        acc[defaultMediaQueryKey] = {};
      } else {
        acc[key] = { '@media': value };
      }
    }
    return acc;
  }, {} as Record<R, {} | { '@media': string }>);
  return {
    conditions,
    defaultCondition: defaultMediaQueryKey,
    responsiveArray: Object.keys(mediaQueries) as R[],
  };
}
