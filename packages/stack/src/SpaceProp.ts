export type ResponsivePropString<S extends string> = S | null | undefined;

export type ResponsivePropArray<S extends string> = ResponsivePropString<S>[];

export type ResponsivePropObject<M extends string, S extends string> = Partial<
  Record<M, S>
>;

export type SpaceProp<M extends string, S extends string> =
  | ResponsivePropString<S>
  | ResponsivePropArray<S>
  | ResponsivePropObject<M, S>;
