import { isValidKey } from './isValidKey';

interface ConditionsSignature<R extends string> {
  mediaQueries: Record<R, string>;
  defaultMediaQueryKey: R;
}

export function getConditionsFromMedia<R extends string>({
  mediaQueries,
  defaultMediaQueryKey,
}: ConditionsSignature<R>) {
  const conditions = Object.entries<string>(mediaQueries).reduce<
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
    responsiveArray: Object.keys(mediaQueries),
  };
}
