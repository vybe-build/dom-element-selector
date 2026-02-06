
import { getSelectedText } from "./get-selected-text";

describe("getSelectedText", () => {
  it("returns undefined when nothing is selected", () => {
    window.getSelection()?.removeAllRanges();
    expect(getSelectedText()).toBeUndefined();
  });

  it("returns selected text", () => {
    document.body.innerHTML = "<p>Hello world</p>";
    const p = document.querySelector("p") as HTMLElement;
    const range = document.createRange();
    range.selectNodeContents(p);
    const selection = window.getSelection()!;
    selection.removeAllRanges();
    selection.addRange(range);
    expect(getSelectedText()).toBe("Hello world");
  });

  it("returns undefined for whitespace-only selection", () => {
    document.body.innerHTML = "<p>   </p>";
    const p = document.querySelector("p") as HTMLElement;
    const range = document.createRange();
    range.selectNodeContents(p);
    const selection = window.getSelection()!;
    selection.removeAllRanges();
    selection.addRange(range);
    expect(getSelectedText()).toBeUndefined();
  });
});
