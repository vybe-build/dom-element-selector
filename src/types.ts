"use client";

export interface DomElementSelectorInfo {
  element: string;
  elementPath: string;
  fullPath: string;
  cssClasses: string;
  nearbyText: string;
  nearbyElements: string;
  computedStyles: string;
  accessibility: string;
  selectedText?: string;
  boundingBox: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  isFixed: boolean;
  domElement: HTMLElement;
}

export type DomElementSelectorFilterFn = (element: HTMLElement, info: DomElementSelectorInfo) => boolean;

export interface DomElementSelectorOptions {
  onSelect: (info: DomElementSelectorInfo) => void;
  onCancel?: () => void;
  overlayColor?: string;
  highlightColor?: string;
  showTooltip?: boolean;
  filter?: DomElementSelectorFilterFn;
}

export interface DomElementSelectorState {
  isActive: boolean;
  hoveredElement: DomElementSelectorInfo | null;
}
