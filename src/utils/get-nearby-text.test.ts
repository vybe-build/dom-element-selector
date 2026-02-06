
import { getNearbyText } from "./get-nearby-text";

describe("getNearbyText", () => {
  it("returns the element own text", () => {
    document.body.innerHTML = "<p>Hello world</p>";
    const p = document.querySelector("p") as HTMLElement;
    expect(getNearbyText(p)).toBe("Hello world");
  });

  it("falls back to parent text when element has no text", () => {
    document.body.innerHTML = "<div>Parent text<span></span></div>";
    const span = document.querySelector("span") as HTMLElement;
    // span has no textContent of its own
    expect(getNearbyText(span)).toContain("(parent:");
  });

  it("includes previous sibling text", () => {
    document.body.innerHTML = "<div><span>Before</span><button>Click</button></div>";
    const btn = document.querySelector("button") as HTMLElement;
    expect(getNearbyText(btn)).toContain("(before: Before)");
  });

  it("truncates own text to 100 chars", () => {
    const longText = "A".repeat(200);
    document.body.innerHTML = `<p>${longText}</p>`;
    const p = document.querySelector("p") as HTMLElement;
    expect(getNearbyText(p).length).toBeLessThanOrEqual(100);
  });

  it("returns empty string when no text anywhere", () => {
    document.body.innerHTML = "<div><img></div>";
    const img = document.querySelector("img") as HTMLElement;
    // img has no text, parent div also has no text
    expect(getNearbyText(img)).toBe("");
  });
});
