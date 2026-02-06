import { GENERIC_TAGS } from "./generic-tags";
import { getCleanClasses } from "./get-clean-classes";

export function getElementPath(el: HTMLElement): string {
  const path: string[] = [];
  let current: HTMLElement | null = el;

  while (current && current !== document.body) {
    const tag = current.tagName.toLowerCase();

    // Skip generic wrappers without meaningful identifiers
    if (!GENERIC_TAGS.has(tag) || current.id || getCleanClasses(current).length > 0) {
      let identifier = tag;
      if (current.id) {
        identifier = `${tag}#${current.id}`;
      } else {
        const classes = getCleanClasses(current);
        if (classes.length > 0) {
          identifier = `${tag}.${classes.slice(0, 2).join(".")}`;
        }
      }
      path.unshift(identifier);
    }

    current = current.parentElement;
    if (path.length >= 5) break;
  }

  return path.join(" > ");
}
