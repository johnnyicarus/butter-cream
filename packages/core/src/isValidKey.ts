export function isValidKey<R extends string>(
  str: string,
  map: Record<R, string>,
): str is R {
  return str ? Object.keys(map).includes(str) : false;
}
