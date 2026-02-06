import { GENERIC_TAGS } from "./generic-tags";
import { getCleanClasses } from "./get-clean-classes";

export function identifyElement(el: HTMLElement): string {
  const tag = el.tagName.toLowerCase();

  // SVG elements
  if (tag === "svg" || el.closest("svg")) {
    return "SVG Graphic";
  }

  // Buttons
  if (tag === "button" || el.getAttribute("role") === "button") {
    const text = el.textContent?.trim().slice(0, 30);
    return text ? `Button "${text}"` : "Button";
  }

  // Links
  if (tag === "a") {
    const text = el.textContent?.trim().slice(0, 30);
    return text ? `Link "${text}"` : "Link";
  }

  // Inputs
  if (tag === "input") {
    const type = el.getAttribute("type") || "text";
    const placeholder = el.getAttribute("placeholder");
    return placeholder ? `Input (${type}) "${placeholder}"` : `Input (${type})`;
  }

  // Textareas
  if (tag === "textarea") {
    const placeholder = el.getAttribute("placeholder");
    return placeholder ? `Textarea "${placeholder}"` : "Textarea";
  }

  // Selects
  if (tag === "select") {
    return "Select dropdown";
  }

  // Headings
  if (/^h[1-6]$/.test(tag)) {
    const text = el.textContent?.trim().slice(0, 40);
    return text ? `${tag.toUpperCase()} "${text}"` : tag.toUpperCase();
  }

  // Images
  if (tag === "img") {
    const alt = el.getAttribute("alt");
    return alt ? `Image "${alt}"` : "Image";
  }

  // Text content elements
  if (tag === "p" || tag === "span" || tag === "label") {
    const text = el.textContent?.trim().slice(0, 40);
    if (text) {
      return `${tag === "p" ? "Paragraph" : tag === "label" ? "Label" : "Text"} "${text}"`;
    }
  }

  // List items
  if (tag === "li") {
    const text = el.textContent?.trim().slice(0, 30);
    return text ? `List item "${text}"` : "List item";
  }

  // Table elements
  if (tag === "table") return "Table";
  if (tag === "tr") return "Table row";
  if (tag === "td" || tag === "th") {
    const text = el.textContent?.trim().slice(0, 20);
    return text ? `Table cell "${text}"` : "Table cell";
  }

  // Generic containers - try to identify by class or id
  if (GENERIC_TAGS.has(tag)) {
    const id = el.id;
    if (id) return `${tag}#${id}`;

    const classes = getCleanClasses(el);
    if (classes.length > 0) {
      return `${tag}.${classes[0]}`;
    }
  }

  return tag;
}
