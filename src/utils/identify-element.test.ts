
import { identifyElement } from "./identify-element";

function el(html: string): HTMLElement {
  document.body.innerHTML = html;
  return document.body.firstElementChild as HTMLElement;
}

describe("identifyElement", () => {
  it("identifies a button with text", () => {
    expect(identifyElement(el("<button>Submit</button>"))).toBe('Button "Submit"');
  });

  it("identifies a button without text", () => {
    expect(identifyElement(el("<button></button>"))).toBe("Button");
  });

  it("identifies a role=button element", () => {
    expect(identifyElement(el('<div role="button">Click me</div>'))).toBe('Button "Click me"');
  });

  it("identifies a link with text", () => {
    expect(identifyElement(el("<a>Home</a>"))).toBe('Link "Home"');
  });

  it("identifies a link without text", () => {
    expect(identifyElement(el("<a></a>"))).toBe("Link");
  });

  it("identifies an input with placeholder", () => {
    expect(identifyElement(el('<input placeholder="Email">'))).toBe('Input (text) "Email"');
  });

  it("identifies an input with type", () => {
    expect(identifyElement(el('<input type="password">'))).toBe("Input (password)");
  });

  it("identifies a textarea", () => {
    expect(identifyElement(el("<textarea></textarea>"))).toBe("Textarea");
  });

  it("identifies a textarea with placeholder", () => {
    expect(identifyElement(el('<textarea placeholder="Message"></textarea>'))).toBe(
      'Textarea "Message"',
    );
  });

  it("identifies a select", () => {
    expect(identifyElement(el("<select></select>"))).toBe("Select dropdown");
  });

  it("identifies headings", () => {
    expect(identifyElement(el("<h1>Title</h1>"))).toBe('H1 "Title"');
    expect(identifyElement(el("<h3>Section</h3>"))).toBe('H3 "Section"');
  });

  it("identifies an image with alt", () => {
    expect(identifyElement(el('<img alt="Logo">'))).toBe('Image "Logo"');
  });

  it("identifies an image without alt", () => {
    expect(identifyElement(el("<img>"))).toBe("Image");
  });

  it("identifies a paragraph", () => {
    expect(identifyElement(el("<p>Hello world</p>"))).toBe('Paragraph "Hello world"');
  });

  it("identifies a label", () => {
    expect(identifyElement(el("<label>Name</label>"))).toBe('Label "Name"');
  });

  it("identifies a list item", () => {
    expect(identifyElement(el("<li>Item one</li>"))).toBe('List item "Item one"');
  });

  it("identifies table elements", () => {
    expect(identifyElement(el("<table></table>"))).toBe("Table");
  });

  it("identifies a table row", () => {
    document.body.innerHTML = "<table><tr id='target'><td>cell</td></tr></table>";
    const tr = document.getElementById("target")!;
    expect(identifyElement(tr)).toBe("Table row");
  });

  it("identifies a table cell with text", () => {
    document.body.innerHTML = "<table><tr><td id='target'>Price</td></tr></table>";
    const td = document.getElementById("target")!;
    expect(identifyElement(td)).toBe('Table cell "Price"');
  });

  it("identifies a div by id", () => {
    expect(identifyElement(el('<div id="sidebar"></div>'))).toBe("div#sidebar");
  });

  it("identifies a div by class", () => {
    expect(identifyElement(el('<div class="card"></div>'))).toBe("div.card");
  });

  it("falls back to tag name for unknown elements", () => {
    expect(identifyElement(el("<code>snippet</code>"))).toBe("code");
  });

  it("truncates long button text to 30 chars", () => {
    const longText = "A".repeat(50);
    const result = identifyElement(el(`<button>${longText}</button>`));
    expect(result).toBe(`Button "${"A".repeat(30)}"`);
  });
});
