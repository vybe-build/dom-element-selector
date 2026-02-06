
import { shouldIgnoreElement } from "./should-ignore-element";

describe("shouldIgnoreElement", () => {
  it("ignores elements inside the overlay", () => {
    document.body.innerHTML =
      '<div data-dom-element-selector-overlay><span id="target">overlay child</span></div>';
    const span = document.getElementById("target") as HTMLElement;
    expect(shouldIgnoreElement(span)).toBe(true);
  });

  it("ignores the overlay element itself", () => {
    document.body.innerHTML = '<div data-dom-element-selector-overlay></div>';
    const overlay = document.querySelector("[data-dom-element-selector-overlay]") as HTMLElement;
    expect(shouldIgnoreElement(overlay)).toBe(true);
  });

  it("ignores document.body", () => {
    expect(shouldIgnoreElement(document.body)).toBe(true);
  });

  it("ignores document.documentElement", () => {
    expect(shouldIgnoreElement(document.documentElement)).toBe(true);
  });

  it("does not ignore regular elements", () => {
    document.body.innerHTML = "<button>Click</button>";
    const btn = document.querySelector("button") as HTMLElement;
    expect(shouldIgnoreElement(btn)).toBe(false);
  });
});
