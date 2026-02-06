export function getAccessibilityInfo(el: HTMLElement): string {
  const info: string[] = [];

  // Role
  const role = el.getAttribute("role");
  if (role) {
    info.push(`role="${role}"`);
  }

  // ARIA attributes
  const ariaAttrs = Array.from(el.attributes)
    .filter((attr) => attr.name.startsWith("aria-"))
    .map((attr) => `${attr.name}="${attr.value}"`);

  if (ariaAttrs.length > 0) {
    info.push(...ariaAttrs);
  }

  // Tab index
  const tabIndex = el.getAttribute("tabindex");
  if (tabIndex) {
    info.push(`tabindex="${tabIndex}"`);
  }

  // Disabled state
  if (el.hasAttribute("disabled")) {
    info.push("disabled");
  }

  // Required state
  if (el.hasAttribute("required")) {
    info.push("required");
  }

  return info.join(", ");
}
