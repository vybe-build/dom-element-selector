
import { getComputedStyles } from "./get-computed-styles";

describe("getComputedStyles", () => {
  it("includes display property", () => {
    document.body.innerHTML = "<div>test</div>";
    const div = document.querySelector("div") as HTMLElement;
    const result = getComputedStyles(div);
    expect(result).toContain("display:");
  });

  it("includes size, padding, and margin", () => {
    document.body.innerHTML = "<div>test</div>";
    const div = document.querySelector("div") as HTMLElement;
    const result = getComputedStyles(div);
    expect(result).toContain("size:");
    expect(result).toContain("padding:");
    expect(result).toContain("margin:");
  });

  it("includes font info for text elements", () => {
    document.body.innerHTML = "<p>Hello</p>";
    const p = document.querySelector("p") as HTMLElement;
    const result = getComputedStyles(p);
    expect(result).toContain("font:");
    expect(result).toContain("color:");
  });

  it("does not include font info for non-text elements", () => {
    document.body.innerHTML = "<div>Hello</div>";
    const div = document.querySelector("div") as HTMLElement;
    const result = getComputedStyles(div);
    expect(result).not.toContain("font:");
  });

  it("includes position when not static", () => {
    document.body.innerHTML = '<div style="position: relative">test</div>';
    const div = document.querySelector("div") as HTMLElement;
    const result = getComputedStyles(div);
    expect(result).toContain("position: relative");
  });
});
