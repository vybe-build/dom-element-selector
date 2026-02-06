
import { getAccessibilityInfo } from "./get-accessibility-info";

function el(html: string): HTMLElement {
  const div = document.createElement("div");
  div.innerHTML = html;
  return div.firstElementChild as HTMLElement;
}

describe("getAccessibilityInfo", () => {
  it("returns role attribute", () => {
    expect(getAccessibilityInfo(el('<div role="navigation"></div>'))).toBe('role="navigation"');
  });

  it("returns aria attributes", () => {
    const result = getAccessibilityInfo(el('<button aria-label="Close" aria-expanded="true"></button>'));
    expect(result).toContain('aria-label="Close"');
    expect(result).toContain('aria-expanded="true"');
  });

  it("returns tabindex", () => {
    expect(getAccessibilityInfo(el('<div tabindex="0"></div>'))).toBe('tabindex="0"');
  });

  it("returns disabled state", () => {
    expect(getAccessibilityInfo(el("<button disabled></button>"))).toBe("disabled");
  });

  it("returns required state", () => {
    expect(getAccessibilityInfo(el("<input required>"))).toBe("required");
  });

  it("combines multiple attributes", () => {
    const result = getAccessibilityInfo(
      el('<button role="tab" aria-selected="true" tabindex="0"></button>'),
    );
    expect(result).toBe('role="tab", aria-selected="true", tabindex="0"');
  });

  it("returns empty string when no accessibility attributes", () => {
    expect(getAccessibilityInfo(el("<div></div>"))).toBe("");
  });
});
