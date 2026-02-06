
import { getElementPath } from "./get-element-path";

describe("getElementPath", () => {
  it("returns path for a simple nested element", () => {
    document.body.innerHTML = '<main><section class="hero"><button>Click</button></section></main>';
    const btn = document.querySelector("button") as HTMLElement;
    // main is a generic tag without id/class, so it gets skipped
    expect(getElementPath(btn)).toBe("section.hero > button");
  });

  it("uses id when available", () => {
    document.body.innerHTML = '<div id="app"><button>Click</button></div>';
    const btn = document.querySelector("button") as HTMLElement;
    expect(getElementPath(btn)).toBe("div#app > button");
  });

  it("skips generic tags without identifiers", () => {
    document.body.innerHTML = "<div><div><button>Click</button></div></div>";
    const btn = document.querySelector("button") as HTMLElement;
    expect(getElementPath(btn)).toBe("button");
  });

  it("limits path depth to 5 segments", () => {
    document.body.innerHTML = `
      <nav><ul><li><a><span class="icon"><i class="fa"></i></span></a></li></ul></nav>
    `;
    const i = document.querySelector("i") as HTMLElement;
    const path = getElementPath(i);
    expect(path.split(" > ").length).toBeLessThanOrEqual(5);
  });

  it("returns empty string for body", () => {
    expect(getElementPath(document.body)).toBe("");
  });
});
