import { getCleanClasses } from "./get-clean-classes";

export function getFullElementPath(el: HTMLElement): string {
  const path: string[] = [];
  let current: HTMLElement | null = el;

  while (current && current !== document.body) {
    const tag = current.tagName.toLowerCase();
    let identifier = tag;

    if (current.id) {
      identifier = `${tag}#${current.id}`;
    } else {
      const classes = getCleanClasses(current);
      if (classes.length > 0) {
        identifier = `${tag}.${classes.join(".")}`;
      }
    }

    path.unshift(identifier);
    current = current.parentElement;
  }

  return path.join(" > ");
}
