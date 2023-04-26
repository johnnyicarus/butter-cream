export function isValidKey<R extends string | number>(
  str: string | number,
  map: Record<R, string | number>,
): str is R {
  return str ? (Object.keys(map) as (string | number)[]).includes(str) : false;
}
