// SVG class to create the necessary components for an svg file
class SVG {
  constructor() {
    this.text = "";
    this.shape = "";
  }
  // Render function to return the text to actually create the svg file setup
  render() {
    return `<svg version="1.1" width="300" height="200" xmlns="http://www.w3.org/2000/svg">${this.shape}${this.text}</svg>`;
  }

  // Function to set the color and the text for the textContent of the logo
  setTextContent(text, color) {
    return (this.text = `<text x="150" y="125" style="dominant-baseline:central; text-anchor:middle; font-size:40px; fill:${color}">${text}</text>`);
  }

  // Function to set the shape of the logo
  setShape(shape) {
    this.shape = shape.render();
  }
}

// Exporting the module to be used in other javascript files
module.exports = SVG;
