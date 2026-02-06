import type { DomElementSelectorInfo } from "../types";
import { getAccessibilityInfo } from "./get-accessibility-info";
import { getCleanClasses } from "./get-clean-classes";
import { getComputedStyles } from "./get-computed-styles";
import { getElementPath } from "./get-element-path";
import { getFullElementPath } from "./get-full-element-path";
import { getNearbyElements } from "./get-nearby-elements";
import { getNearbyText } from "./get-nearby-text";
import { getSelectedText } from "./get-selected-text";
import { identifyElement } from "./identify-element";
import { isFixedElement } from "./is-fixed-element";

export function getElementInfo(el: HTMLElement): DomElementSelectorInfo {
  const rect = el.getBoundingClientRect();

  return {
    element: identifyElement(el),
    elementPath: getElementPath(el),
    fullPath: getFullElementPath(el),
    cssClasses: getCleanClasses(el).join(" "),
    nearbyText: getNearbyText(el),
    nearbyElements: getNearbyElements(el),
    computedStyles: getComputedStyles(el),
    accessibility: getAccessibilityInfo(el),
    selectedText: getSelectedText(),
    boundingBox: {
      x: rect.x,
      y: rect.y,
      width: rect.width,
      height: rect.height,
    },
    isFixed: isFixedElement(el),
    domElement: el,
  };
}
