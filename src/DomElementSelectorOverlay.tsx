"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { getElementInfo, shouldIgnoreElement } from "./utils";
import type { DomElementSelectorOptions } from "./types";

interface DomElementSelectorOverlayProps extends DomElementSelectorOptions {
  isActive: boolean;
}

export function DomElementSelectorOverlay({
  isActive,
  onSelect,
  onCancel,
  highlightColor = "rgba(59, 130, 246, 0.5)",
  filter,
}: DomElementSelectorOverlayProps) {
  const [hoveredElement, setHoveredElement] = useState<HTMLElement | null>(null);
  const [mounted, setMounted] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const getElementAtPoint = useCallback((x: number, y: number): HTMLElement | null => {
    // Temporarily hide overlay to get element underneath
    if (overlayRef.current) {
      overlayRef.current.style.pointerEvents = "none";
    }

    const element = document.elementFromPoint(x, y) as HTMLElement | null;

    // Restore overlay
    if (overlayRef.current) {
      overlayRef.current.style.pointerEvents = "auto";
    }

    return element;
  }, []);

  const findSelectableElement = useCallback(
    (el: HTMLElement | null): HTMLElement | null => {
      let current = el;
      while (current) {
        if (shouldIgnoreElement(current)) {
          current = current.parentElement;
          continue;
        }
        if (filter) {
          const info = getElementInfo(current);
          if (!filter(current, info)) {
            current = current.parentElement;
            continue;
          }
        }
        return current;
      }
      return null;
    },
    [filter],
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isActive) return;

      const rawTarget = getElementAtPoint(e.clientX, e.clientY);
      const target = findSelectableElement(rawTarget);

      if (!target) {
        setHoveredElement(null);
        return;
      }

      if (target !== hoveredElement) {
        setHoveredElement(target);
      }
    },
    [isActive, hoveredElement, getElementAtPoint, findSelectableElement],
  );

  const handleClick = useCallback(
    (e: MouseEvent) => {
      if (!isActive) return;

      e.preventDefault();
      e.stopPropagation();

      const rawTarget = getElementAtPoint(e.clientX, e.clientY);
      const target = findSelectableElement(rawTarget);

      if (!target) {
        onCancel?.();
        return;
      }

      onSelect(getElementInfo(target));
    },
    [isActive, onSelect, onCancel, getElementAtPoint, findSelectableElement],
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isActive) return;

      if (e.key === "Escape") {
        e.preventDefault();
        onCancel?.();
      }
    },
    [isActive, onCancel],
  );

  useEffect(() => {
    if (!isActive) {
      setHoveredElement(null);
      return;
    }

    document.addEventListener("mousemove", handleMouseMove, true);
    document.addEventListener("click", handleClick, true);
    document.addEventListener("keydown", handleKeyDown, true);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove, true);
      document.removeEventListener("click", handleClick, true);
      document.removeEventListener("keydown", handleKeyDown, true);
    };
  }, [isActive, handleMouseMove, handleClick, handleKeyDown]);

  if (!mounted || !isActive) return null;

  const rect = hoveredElement?.getBoundingClientRect();

  return createPortal(
    <div
      ref={overlayRef}
      data-dom-element-selector-overlay
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 999999,
        cursor: "crosshair",
        pointerEvents: "auto",
      }}
    >
      {rect && (
        <div
          style={{
            position: "fixed",
            top: rect.top,
            left: rect.left,
            width: rect.width,
            height: rect.height,
            backgroundColor: highlightColor,
            border: "2px solid rgb(59, 130, 246)",
            borderRadius: "4px",
            pointerEvents: "none",
            transition: "all 0.05s ease-out",
            boxShadow: "0 0 0 9999px rgba(0, 0, 0, 0.3)",
          }}
        />
      )}

      <div
        style={{
          position: "fixed",
          bottom: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          backgroundColor: "rgba(0, 0, 0, 0.85)",
          color: "white",
          padding: "10px 16px",
          borderRadius: "8px",
          fontSize: "13px",
          fontFamily: "system-ui, sans-serif",
          pointerEvents: "none",
          display: "flex",
          gap: "16px",
          alignItems: "center",
        }}
      >
        <span>Click to select an element</span>
        <span style={{ opacity: 0.6 }}>•</span>
        <span style={{ opacity: 0.7 }}>Press Esc to cancel</span>
      </div>
    </div>,
    document.body,
  );
}
