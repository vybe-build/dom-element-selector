import { identifyElement } from "./identify-element";

export function getNearbyElements(el: HTMLElement): string {
  const nearby: string[] = [];

  // Previous sibling
  const prev = el.previousElementSibling as HTMLElement | null;
  if (prev) {
    nearby.push(`prev: ${identifyElement(prev)}`);
  }

  // Next sibling
  const next = el.nextElementSibling as HTMLElement | null;
  if (next) {
    nearby.push(`next: ${identifyElement(next)}`);
  }

  // Parent
  if (el.parentElement && el.parentElement !== document.body) {
    nearby.push(`parent: ${identifyElement(el.parentElement)}`);
  }

  return nearby.join(", ");
}
