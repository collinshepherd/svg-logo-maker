const inquirer = require("inquirer");
const colors = require("./colors");
const SVG = require("./svg");
const { writeFile } = require("fs/promises");
const { Circle, Triangle, Square } = require("./shape");

const checkColorInput = (input) => {
  let lowercase = input.toLowerCase();
  let totalColors = colors.length;
  for (let i = 0; i < totalColors; i++) {
    if (lowercase.indexOf(colors[i]) != -1) {
      return true;
    }
  }
  return console.log("\n That color is invalid\n Please try again");
};

const checkHexInput = (input) => {
  const hexRegEx = "^#[A-Fa-f0-9]{6}$";
  if (input.match(hexRegEx)) {
    return true;
  } else {
    return console.log(
      "\n Invalid Hex Code \n Please try another hexadecimal code"
    );
  }
};

class Questions {
  run() {
    return inquirer
      .prompt([
        {
          type: "input",
          name: "textInput",
          message:
            "Please enter the text you would like inside of the logo (3 characters maximum)",
          validate: (answer) => {
            if (answer.length > 3) {
              return console.log(
                "\n You cannot make the text longer than 3 \n Please Try Again"
              );
            }
            return true;
          },
        },
        {
          type: "list",
          name: "textColorFormat",
          message:
            "Are you going to give a color name or hexadecimal for the color of your shape",
          choices: ["color name", "hexadecimal"],
        },
        {
          type: "input",
          name: "textColor",
          message: "Enter your color name for the text:",
          when: (answers) => {
            if (answers.textColorFormat === "color name") {
              return true;
            }
            return false;
          },
          validate: (textColor) => checkColorInput(textColor),
        },
        {
          type: "input",
          name: "textColor",
          message: "Enter your hexadecimal code for the text:",
          when: (answers) => {
            if (answers.textColorFormat === "hexadecimal") {
              return true;
            }
            return false;
          },
          validate: (textColor) => checkHexInput(textColor),
        },
        {
          type: "list",
          name: "shape",
          message: "What shape do you want your logo to be?",
          choices: ["Circle", "Triangle", "Square"],
        },
        {
          type: "list",
          name: "colorFormat",
          message:
            "Are you going to give a color name or hexadecimal for the color of your shape",
          choices: ["color name", "hexadecimal"],
        },
        {
          type: "input",
          name: "color",
          message: "Enter your color name for the logo:",
          when: (answers) => {
            if (answers.colorFormat === "color name") {
              return true;
            }
            return false;
          },
          validate: (color) => checkColorInput(color),
        },
        {
          type: "input",
          name: "color",
          message: "Enter your hexadecimal code for the logo:",
          when: (answers) => {
            if (answers.colorFormat === "hexadecimal") {
              return true;
            }
            return false;
          },
          validate: (color) => checkHexInput(color),
        },
      ])
      .then(({ shape, color, textInput, textColor }) => {
        let typeOfShape;
        switch (shape) {
          case "Circle":
            typeOfShape = new Circle();
            break;
          case "Triangle":
            typeOfShape = new Triangle();
            break;
          case "Square":
            typeOfShape = new Square();
            break;
          default:
            throw new Error("Shape not defined");
        }

        typeOfShape.setColor(color);

        const svg = new SVG();
        svg.setTextContent(textInput, textColor);
        svg.setShape(typeOfShape);

        return writeFile("./examples/logo.svg", svg.render());
      })
      .then(() => console.log("Logo successfully created"))
      .catch((err) => console.log(err));
  }
}

module.exports = Questions;
