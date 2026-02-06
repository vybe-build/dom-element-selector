"use client";

import { useCallback, useState } from "react";
import { DomElementSelectorOverlay } from "./DomElementSelectorOverlay";
import type { DomElementSelectorInfo, DomElementSelectorOptions } from "./types";

interface UseDomElementSelectorReturn {
  startSelection: () => void;
  stopSelection: () => void;
  isSelecting: boolean;
  DomElementSelectorOverlay: React.FC;
}

/**
 * Hook for selecting DOM elements on a page with visual feedback.
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { startSelection, isSelecting, DomElementSelectorOverlay } = useDomElementSelector({
 *     onSelect: (elementInfo) => {
 *       console.log('Selected:', elementInfo);
 *       // Open your own modal with the element info
 *     },
 *     onCancel: () => {
 *       console.log('Selection cancelled');
 *     },
 *   });
 *
 *   return (
 *     <>
 *       <button onClick={startSelection}>
 *         {isSelecting ? 'Selecting...' : 'Select Element'}
 *       </button>
 *       <DomElementSelectorOverlay />
 *     </>
 *   );
 * }
 * ```
 */
export function useDomElementSelector(options: DomElementSelectorOptions): UseDomElementSelectorReturn {
  const [isSelecting, setIsSelecting] = useState(false);

  const startSelection = useCallback(() => {
    setIsSelecting(true);
  }, []);

  const stopSelection = useCallback(() => {
    setIsSelecting(false);
  }, []);

  const handleSelect = useCallback(
    (info: DomElementSelectorInfo) => {
      setIsSelecting(false);
      options.onSelect(info);
    },
    [options],
  );

  const handleCancel = useCallback(() => {
    setIsSelecting(false);
    options.onCancel?.();
  }, [options]);

  const Overlay = useCallback(() => {
    return (
      <DomElementSelectorOverlay
        isActive={isSelecting}
        onSelect={handleSelect}
        onCancel={handleCancel}
        overlayColor={options.overlayColor}
        highlightColor={options.highlightColor}
        showTooltip={options.showTooltip}
        filter={options.filter}
      />
    );
  }, [
    isSelecting,
    handleSelect,
    handleCancel,
    options.overlayColor,
    options.highlightColor,
    options.showTooltip,
    options.filter,
  ]);

  return {
    startSelection,
    stopSelection,
    isSelecting,
    DomElementSelectorOverlay: Overlay,
  };
}
