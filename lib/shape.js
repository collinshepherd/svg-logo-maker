class Shape {
  constructor() {
    this.color = "";
  }
  setColor(color) {
    this.color = color;
  }
}

class Square extends Shape {
  render() {
    return `<rect x="50" y="20" width="150" height="150" fill="${this.color}" />`;
  }
}

class Triangle extends Shape {
  render() {
    return `<polygon points="50 15, 100 100, 0 100"/> fill="${this.color}" />`;
  }
}

class Circle extends Shape {
  render() {
    return `<circle cx="50" cy="50" r="50" fill="${this.color}" />`;
  }
}

module.exports = { Circle, Triangle, Square };
