
import { isFixedElement } from "./is-fixed-element";

describe("isFixedElement", () => {
  it("returns true for fixed position element", () => {
    document.body.innerHTML = '<div style="position: fixed">fixed</div>';
    const div = document.querySelector("div") as HTMLElement;
    expect(isFixedElement(div)).toBe(true);
  });

  it("returns true for sticky position element", () => {
    document.body.innerHTML = '<div style="position: sticky">sticky</div>';
    const div = document.querySelector("div") as HTMLElement;
    expect(isFixedElement(div)).toBe(true);
  });

  it("returns false for static element", () => {
    document.body.innerHTML = "<div>static</div>";
    const div = document.querySelector("div") as HTMLElement;
    expect(isFixedElement(div)).toBe(false);
  });

  it("returns true when a parent is fixed", () => {
    document.body.innerHTML = '<div style="position: fixed"><span>child</span></div>';
    const span = document.querySelector("span") as HTMLElement;
    expect(isFixedElement(span)).toBe(true);
  });

  it("returns false for relative position element", () => {
    document.body.innerHTML = '<div style="position: relative">relative</div>';
    const div = document.querySelector("div") as HTMLElement;
    expect(isFixedElement(div)).toBe(false);
  });
});
