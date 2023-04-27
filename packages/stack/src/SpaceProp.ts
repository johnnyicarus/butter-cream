export type ResponsivePropString<S extends string | number> =
  | S
  | null
  | undefined;

export type ResponsivePropArray<S extends string | number> =
  ResponsivePropString<S>[];

export type ResponsivePropObject<
  M extends string | number,
  S extends string | number,
> = Partial<Record<M, S>>;

export type SpaceProp<M extends string | number, S extends string | number> =
  | ResponsivePropString<S>
  | ResponsivePropArray<S>
  | ResponsivePropObject<M, S>;
