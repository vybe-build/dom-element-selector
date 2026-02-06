# @vybe-adk/dom-element-selector

[![npm version](https://img.shields.io/npm/v/@vybe-adk/dom-element-selector)](https://www.npmjs.com/package/@vybe-adk/dom-element-selector)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![CI](https://github.com/vybe-build/dom-element-selector/actions/workflows/ci.yml/badge.svg)](https://github.com/vybe-build/dom-element-selector/actions/workflows/ci.yml)

React hook for visually selecting DOM elements on a page with an interactive overlay, element highlighting, and rich metadata extraction.

## Installation

```bash
npm install @vybe-adk/dom-element-selector
```

## Usage

```tsx
import { useDomElementSelector } from "@vybe-adk/dom-element-selector";

function App() {
  const { startSelection, isSelecting, DomElementSelectorOverlay } =
    useDomElementSelector({
      onSelect: (info) => {
        console.log("Selected:", info.element);
        console.log("Path:", info.elementPath);
      },
      onCancel: () => {
        console.log("Cancelled");
      },
    });

  return (
    <>
      <button onClick={startSelection}>
        {isSelecting ? "Selecting..." : "Select Element"}
      </button>
      <DomElementSelectorOverlay />
    </>
  );
}
```

## Options

| Option           | Type                          | Default                        | Description                                        |
|------------------|-------------------------------|--------------------------------|----------------------------------------------------|
| `onSelect`       | `(info: DomElementSelectorInfo) => void` | **required**          | Called when an element is selected                  |
| `onCancel`       | `() => void`                  | —                              | Called when selection is cancelled (Escape or click) |
| `overlayColor`   | `string`                      | —                              | Custom overlay background color                    |
| `highlightColor` | `string`                      | `"rgba(59, 130, 246, 0.5)"`   | Custom highlight color                             |
| `showTooltip`    | `boolean`                     | —                              | Show element info tooltip on hover                 |
| `filter`         | `DomElementSelectorFilterFn`  | —                              | Filter which elements are selectable               |

## Return Value

| Property                    | Type         | Description                              |
|-----------------------------|--------------|------------------------------------------|
| `startSelection`            | `() => void` | Activate selection mode                  |
| `stopSelection`             | `() => void` | Deactivate selection mode                |
| `isSelecting`               | `boolean`    | Whether selection mode is active         |
| `DomElementSelectorOverlay` | `React.FC`   | Overlay component to render in your tree |

## Output

The `onSelect` callback receives a `DomElementSelectorInfo` object:

| Field            | Type                         | Description                                                    |
|------------------|------------------------------|----------------------------------------------------------------|
| `element`        | `string`                     | Human-readable name (e.g., `Button "Submit"`, `Link "Home"`)  |
| `elementPath`    | `string`                     | Simplified DOM path (e.g., `main > section > button`)          |
| `fullPath`       | `string`                     | Full DOM path with IDs and classes                             |
| `cssClasses`     | `string`                     | CSS classes on the element                                     |
| `nearbyText`     | `string`                     | Text content in and around the element                         |
| `nearbyElements` | `string`                     | Info about sibling elements                                    |
| `computedStyles` | `string`                     | Key computed CSS styles                                        |
| `accessibility`  | `string`                     | ARIA attributes, roles, etc.                                   |
| `selectedText`   | `string \| undefined`        | Any text the user had selected                                 |
| `boundingBox`    | `{ x, y, width, height }`    | Element bounding rectangle                                     |
| `isFixed`        | `boolean`                    | Whether the element has fixed/sticky positioning               |
| `domElement`     | `HTMLElement`                 | The actual DOM element                                         |

## Filtering

Use the `filter` option to control which elements can be selected:

```tsx
const { startSelection, DomElementSelectorOverlay } = useDomElementSelector({
  onSelect: (info) => console.log(info),
  filter: (element, info) => {
    // Only allow selecting buttons and links
    return element.tagName === "BUTTON" || element.tagName === "A";
  },
});
```

## Compatibility

| Peer Dependency | Version   |
|-----------------|-----------|
| `react`         | >= 18.0.0 |
| `react-dom`     | >= 18.0.0 |

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

MIT
