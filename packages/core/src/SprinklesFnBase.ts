export interface SprinklesFnBase {
  (...args: any): string;
  properties: Set<string>;
}
