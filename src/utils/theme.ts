export const forcedTheme = (path: string) => {
  if (/^\/$/.test(path)) return undefined;
  return "light";
};
