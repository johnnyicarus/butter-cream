export function getDensitySelector(index: number, modifier: string) {
  const selector = Array.from({ length: index + 1 })
    .map(() => {
      return modifier;
    })
    .join(' ');
  return `${selector}.&`;
}
