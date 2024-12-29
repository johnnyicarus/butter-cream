export interface MediaQuerySettings<TMediaQueryKey extends string | number> {
    defaultKey: TMediaQueryKey;
    orderedRecord: Record<TMediaQueryKey, string | number>;
  }
  