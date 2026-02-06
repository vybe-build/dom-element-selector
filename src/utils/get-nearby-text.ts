export function getNearbyText(el: HTMLElement): string {
  const textParts: string[] = [];

  // Get element's own text
  const ownText = el.textContent?.trim().slice(0, 100);
  if (ownText) {
    textParts.push(ownText);
  }

  // Get parent text if element has none
  if (!ownText && el.parentElement) {
    const parentText = el.parentElement.textContent?.trim().slice(0, 100);
    if (parentText) {
      textParts.push(`(parent: ${parentText})`);
    }
  }

  // Get previous sibling text
  const prevSibling = el.previousElementSibling as HTMLElement | null;
  if (prevSibling) {
    const prevText = prevSibling.textContent?.trim().slice(0, 50);
    if (prevText) {
      textParts.push(`(before: ${prevText})`);
    }
  }

  return textParts.join(" ");
}
