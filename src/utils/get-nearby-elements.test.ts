
import { getNearbyElements } from "./get-nearby-elements";

describe("getNearbyElements", () => {
  it("lists previous sibling", () => {
    document.body.innerHTML = "<div><button>Prev</button><span>Target</span></div>";
    const span = document.querySelector("span") as HTMLElement;
    expect(getNearbyElements(span)).toContain('prev: Button "Prev"');
  });

  it("lists next sibling", () => {
    document.body.innerHTML = "<div><span>Target</span><a>Next</a></div>";
    const span = document.querySelector("span") as HTMLElement;
    expect(getNearbyElements(span)).toContain('next: Link "Next"');
  });

  it("lists parent element", () => {
    document.body.innerHTML = '<main><button id="target">Click</button></main>';
    const btn = document.querySelector("button") as HTMLElement;
    expect(getNearbyElements(btn)).toContain("parent: main");
  });

  it("does not include parent if it is body", () => {
    document.body.innerHTML = "<button>Click</button>";
    const btn = document.querySelector("button") as HTMLElement;
    expect(getNearbyElements(btn)).not.toContain("parent:");
  });

  it("returns empty string for lone element in body", () => {
    document.body.innerHTML = "<button>Click</button>";
    const btn = document.querySelector("button") as HTMLElement;
    expect(getNearbyElements(btn)).toBe("");
  });
});
