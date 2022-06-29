export function hasValues(obj: any) {
  return obj && Object.values(obj).length ? true : false;
}