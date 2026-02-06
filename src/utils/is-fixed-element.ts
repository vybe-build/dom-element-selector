export function isFixedElement(el: HTMLElement): boolean {
  let current: HTMLElement | null = el;

  while (current) {
    const position = window.getComputedStyle(current).position;
    if (position === "fixed" || position === "sticky") {
      return true;
    }
    current = current.parentElement;
  }

  return false;
}
