
import { getFullElementPath } from "./get-full-element-path";

describe("getFullElementPath", () => {
  it("returns full path including generic wrappers", () => {
    document.body.innerHTML = "<div><div><button>Click</button></div></div>";
    const btn = document.querySelector("button") as HTMLElement;
    expect(getFullElementPath(btn)).toBe("div > div > button");
  });

  it("includes ids in path", () => {
    document.body.innerHTML = '<div id="root"><div id="app"><span>Hi</span></div></div>';
    const span = document.querySelector("span") as HTMLElement;
    expect(getFullElementPath(span)).toBe("div#root > div#app > span");
  });

  it("includes classes in path", () => {
    document.body.innerHTML = '<div class="container"><p class="intro">Text</p></div>';
    const p = document.querySelector("p") as HTMLElement;
    expect(getFullElementPath(p)).toBe("div.container > p.intro");
  });

  it("returns empty string for body", () => {
    expect(getFullElementPath(document.body)).toBe("");
  });
});
