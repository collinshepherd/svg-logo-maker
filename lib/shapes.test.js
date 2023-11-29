const SVG = require("./svg");
const { Circle, Triangle, Square } = require("./shape");

describe("Circle Class", () => {
  it("should create a new object and set the color of the shape correctly", () => {
    const shape = new Circle();
    shape.setColor("red");
    expect(shape.render()).toEqual(
      `<circle cx="150" cy="120" r="80" fill="red" />`
    );
  });
  it("should create a new SVG object and set the text and the text color correctly", () => {
    const textContent = new SVG();
    textContent.setTextContent("TIM", "red");
    expect(textContent.render()).toEqual(
      `<svg version="1.1" width="300" height="200" xmlns="http://www.w3.org/2000/svg"><text x="150" y="125" style="dominant-baseline:central; text-anchor:middle; font-size:40px; fill:red">TIM</text></svg>`
    );
  });
});

describe("Square Class", () => {
  it("should create a new square object and set the shape color correctly", () => {
    const shape = new Square();
    shape.setColor("green");
    expect(shape.render()).toEqual(
      `<rect x="90" y="60" width="120" height="120" fill="green" />`
    );
  });
  it("should create a new SVG object and set the text and text color correctly", () => {
    const textContent = new SVG();
    textContent.setTextContent("PIP", "yellow");
    expect(textContent.render()).toEqual(
      `<svg version="1.1" width="300" height="200" xmlns="http://www.w3.org/2000/svg"><text x="150" y="125" style="dominant-baseline:central; text-anchor:middle; font-size:40px; fill:yellow">PIP</text></svg>`
    );
  });
});

describe("Triangle Class", () => {
  it("should create a new triangle object and set the shape color correctly", () => {
    const shape = new Triangle();
    shape.setColor("purple");
    expect(shape.render()).toEqual(
      `<polygon points="150, 18 244, 182 56, 182" fill="purple" />`
    );
  });
  it("should create a new SVG object and set the text and text color correctly", () => {
    const textContent = new SVG();
    textContent.setTextContent("WOW", "black");
    expect(textContent.render()).toEqual(
      `<svg version="1.1" width="300" height="200" xmlns="http://www.w3.org/2000/svg"><text x="150" y="125" style="dominant-baseline:central; text-anchor:middle; font-size:40px; fill:black">WOW</text></svg>`
    );
  });
});
