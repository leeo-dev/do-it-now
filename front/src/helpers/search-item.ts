export function searchItems<T extends Record<K, string>, K extends keyof T>(
  items: T[],
  key: string,
  property: K
): T[] {
  const lowerCaseKey = key.toLowerCase();
  return items.filter((item) =>
    item[property].toLowerCase().includes(lowerCaseKey)
  );
}
