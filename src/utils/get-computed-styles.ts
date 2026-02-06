export function getComputedStyles(el: HTMLElement): string {
  const styles = window.getComputedStyle(el);
  const tag = el.tagName.toLowerCase();
  const relevantProps: string[] = [];

  // Typography (for text elements)
  if (["p", "span", "h1", "h2", "h3", "h4", "h5", "h6", "a", "button", "label"].includes(tag)) {
    relevantProps.push(`font: ${styles.fontSize} ${styles.fontWeight} ${styles.fontFamily.split(",")[0]}`);
    relevantProps.push(`color: ${styles.color}`);
  }

  // Layout
  relevantProps.push(`display: ${styles.display}`);
  if (styles.display === "flex" || styles.display === "inline-flex") {
    relevantProps.push(`flex-direction: ${styles.flexDirection}`);
    relevantProps.push(`gap: ${styles.gap}`);
  }
  if (styles.display === "grid") {
    relevantProps.push(`grid-template-columns: ${styles.gridTemplateColumns}`);
  }

  // Sizing
  relevantProps.push(`size: ${styles.width} × ${styles.height}`);
  relevantProps.push(`padding: ${styles.padding}`);
  relevantProps.push(`margin: ${styles.margin}`);

  // Background
  if (styles.backgroundColor !== "rgba(0, 0, 0, 0)") {
    relevantProps.push(`background: ${styles.backgroundColor}`);
  }

  // Border
  if (styles.borderWidth !== "0px") {
    relevantProps.push(`border: ${styles.borderWidth} ${styles.borderStyle} ${styles.borderColor}`);
  }

  // Border radius
  if (styles.borderRadius !== "0px") {
    relevantProps.push(`border-radius: ${styles.borderRadius}`);
  }

  // Position
  if (styles.position !== "static") {
    relevantProps.push(`position: ${styles.position}`);
  }

  return relevantProps.join("; ");
}
