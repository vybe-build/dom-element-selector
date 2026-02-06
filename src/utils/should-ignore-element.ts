export function shouldIgnoreElement(el: HTMLElement): boolean {
  // Ignore our own overlay elements
  if (el.closest("[data-dom-element-selector-overlay]")) {
    return true;
  }

  // Ignore body and html
  if (el === document.body || el === document.documentElement) {
    return true;
  }

  return false;
}
