
import { getCleanClasses } from "./get-clean-classes";

function el(html: string): HTMLElement {
  const div = document.createElement("div");
  div.innerHTML = html;
  return div.firstElementChild as HTMLElement;
}

describe("getCleanClasses", () => {
  it("returns regular class names", () => {
    expect(getCleanClasses(el('<div class="card primary"></div>'))).toEqual(["card", "primary"]);
  });

  it("filters out CSS module hashes (BEM___hash)", () => {
    expect(getCleanClasses(el('<div class="block__element___abc123"></div>'))).toEqual([]);
  });

  it("filters out CSS module hashes (_hash_hash)", () => {
    expect(getCleanClasses(el('<div class="_abc123_def456"></div>'))).toEqual([]);
  });

  it("filters out css-* utility classes", () => {
    expect(getCleanClasses(el('<div class="css-a1b2c3"></div>'))).toEqual([]);
  });

  it("keeps valid classes and filters invalid ones", () => {
    expect(getCleanClasses(el('<div class="card css-abc123 primary"></div>'))).toEqual([
      "card",
      "primary",
    ]);
  });

  it("limits to 5 classes", () => {
    expect(
      getCleanClasses(el('<div class="a b c d e f g"></div>')),
    ).toEqual(["a", "b", "c", "d", "e"]);
  });

  it("returns empty array for element with no classes", () => {
    expect(getCleanClasses(el("<div></div>"))).toEqual([]);
  });
});
