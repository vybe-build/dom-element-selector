export function getCleanClasses(el: HTMLElement): string[] {
  const classes = Array.from(el.classList);

  return classes
    .filter((cls) => {
      // Filter out CSS module hashes and utility classes
      if (/^[a-z]+__[a-z]+___[a-zA-Z0-9]+$/i.test(cls)) return false;
      if (/^_[a-zA-Z0-9]+_[a-zA-Z0-9]+$/i.test(cls)) return false;
      if (/^css-[a-zA-Z0-9]+$/i.test(cls)) return false;
      return true;
    })
    .slice(0, 5);
}
