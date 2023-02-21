type Nullable<T> = T | null | undefined;

export function removeNullProperties<T extends Record<string, Nullable<any>>>(
  obj: T
): T {
  for (const key in obj) {
    if (obj[key] === null) {
      delete obj[key];
    }
  }
  return obj;
}
