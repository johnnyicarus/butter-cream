export type ResponsivePropString<TSpacingScaleKey extends string | number> =
  | TSpacingScaleKey
  | null
  | undefined;

export type ResponsivePropArray<TSpacingScaleKey extends string | number> =
  ResponsivePropString<TSpacingScaleKey>[];

export type ResponsivePropObject<
  TMediaQueryKey extends string,
  TSpacingScaleKey extends string | number
> = Partial<Record<TMediaQueryKey, TSpacingScaleKey>>;

export type SpaceProp<
  TMediaQueryKey extends string,
  TSpacingScaleKey extends string | number
> =
  | ResponsivePropString<TSpacingScaleKey>
  | ResponsivePropArray<TSpacingScaleKey>
  | ResponsivePropObject<TMediaQueryKey, TSpacingScaleKey>;
