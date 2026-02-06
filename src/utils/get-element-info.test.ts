
import { getElementInfo } from "./get-element-info";

describe("getElementInfo", () => {
  it("returns complete info for a button", () => {
    document.body.innerHTML = '<main><button class="primary" aria-label="Save">Save</button></main>';
    const btn = document.querySelector("button") as HTMLElement;
    const info = getElementInfo(btn);

    expect(info.element).toBe('Button "Save"');
    expect(info.elementPath).toContain("button");
    expect(info.fullPath).toContain("button");
    expect(info.cssClasses).toBe("primary");
    expect(info.nearbyText).toContain("Save");
    expect(info.accessibility).toContain('aria-label="Save"');
    expect(info.boundingBox).toHaveProperty("x");
    expect(info.boundingBox).toHaveProperty("y");
    expect(info.boundingBox).toHaveProperty("width");
    expect(info.boundingBox).toHaveProperty("height");
    expect(typeof info.isFixed).toBe("boolean");
    expect(info.domElement).toBe(btn);
  });

  it("includes all expected fields", () => {
    document.body.innerHTML = "<div>Test</div>";
    const div = document.querySelector("div") as HTMLElement;
    const info = getElementInfo(div);

    expect(info).toHaveProperty("element");
    expect(info).toHaveProperty("elementPath");
    expect(info).toHaveProperty("fullPath");
    expect(info).toHaveProperty("cssClasses");
    expect(info).toHaveProperty("nearbyText");
    expect(info).toHaveProperty("nearbyElements");
    expect(info).toHaveProperty("computedStyles");
    expect(info).toHaveProperty("accessibility");
    expect(info).toHaveProperty("boundingBox");
    expect(info).toHaveProperty("isFixed");
    expect(info).toHaveProperty("domElement");
  });
});
