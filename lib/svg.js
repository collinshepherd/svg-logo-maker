class SVG {
  constructor() {
    this.text = "";
    this.shape = "";
  }
  render() {
    return `<width="200" heigh="100" xmlns="http://www.w3.org/2000/svg">${this.shape}${this.text}</svg>`;
  }

  setTextContent(text, color) {
    return (this.text = `<text x="100" y="75" font-size="30" text-anchor="middle" fill="${color}">${text}</text>`);
  }

  setShape(shape) {
    this.shapeElement = shape.render();
  }
}

module.exports = SVG;
