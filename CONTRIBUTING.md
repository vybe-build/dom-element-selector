# Contributing

Thanks for your interest in contributing to `@vybe-adk/dom-element-selector`!

## Getting started

1. Fork and clone the repository:

```bash
git clone https://github.com/vybe-build/dom-element-selector.git
cd dom-element-selector
```

2. Install dependencies:

```bash
npm install
```

3. Verify everything works:

```bash
npm test
npm run typecheck
npm run build
```

## Project structure

```
src/
  index.ts                         # Public API exports
  types.ts                         # Shared TypeScript types
  use-dom-element-selector.tsx     # Main React hook
  DomElementSelectorOverlay.tsx    # Overlay component
  utils/
    identify-element.ts            # Human-readable element name
    get-element-path.ts            # Simplified DOM path
    get-full-element-path.ts       # Full DOM path with IDs/classes
    get-clean-classes.ts           # CSS class filtering
    get-nearby-text.ts             # Text content extraction
    get-nearby-elements.ts         # Sibling element info
    get-computed-styles.ts         # Computed CSS styles
    get-accessibility-info.ts      # ARIA/role attributes
    is-fixed-element.ts            # Fixed/sticky detection
    get-selected-text.ts           # User text selection
    get-element-info.ts            # Combines all utils into one info object
    should-ignore-element.ts       # Element filtering (overlay, body)
    generic-tags.ts                # Shared constants
    index.ts                       # Barrel exports
```

Each utility function has a co-located test file (e.g., `get-clean-classes.test.ts` next to `get-clean-classes.ts`).

## Scripts

| Command            | Description                    |
|--------------------|--------------------------------|
| `npm test`         | Run tests with Jest            |
| `npm run test:watch` | Run tests in watch mode      |
| `npm run typecheck`| Type-check with TypeScript     |
| `npm run build`    | Build with tsup (ESM + CJS)   |
| `npm run dev`      | Build in watch mode            |

## Making changes

1. Create a branch from `main`:

```bash
git checkout -b my-feature
```

2. Make your changes. If adding a new utility function:
   - Create the function in its own file under `src/utils/`
   - Add a test file next to it (e.g., `my-function.test.ts`)
   - Export it from `src/utils/index.ts`

3. Run tests and typecheck:

```bash
npm test
npm run typecheck
```

4. Commit your changes and open a pull request against `main`.

## Code style

- TypeScript strict mode is enabled
- Test files live next to the source files they test
- One function per file in `src/utils/`
- Use descriptive function names that explain what the function returns

## Reporting issues

Open an issue on [GitHub](https://github.com/vybe-build/dom-element-selector/issues) with a clear description and steps to reproduce.

## License

By contributing, you agree that your contributions will be licensed under the [MIT License](LICENSE).
