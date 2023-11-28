const inquirer = require("inquirer");
const colors = require("./colors");
const svg = require("./svg");
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
  const hexRegEx = "/^#[0-9A-F]{6}$/i";
  if (input.match(hexRegEx) && input.test("#AABBCC")) {
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
          type: "list",
          name: "shape",
          message: "What shape do you want your logo to be?",
          choices: ["Circle", "Triangle", "Square"],
        },
        {
          type: "list",
          name: "colorFormat",
          message:
            "Are you going to give a color keyword or hexadecimal for the color of your shape",
          choices: ["color keyword", "hexadecimal"],
        },
        {
          type: "input",
          name: "color",
          message: "Enter your color keyword for the logo:",
          when: (answers) => {
            if (answers.colorFormat === "color keyword") {
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
            "Are you going to give a color keyword or hexadecimal for the color of your shape",
          choices: ["color keyword", "hexadecimal"],
        },
        {
          type: "input",
          name: "textColor",
          message: "Enter your color keyword for the text:",
          when: (answers) => {
            if (answers.colorFormat === "color keyword") {
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
            if (answers.colorFormat === "hexadecimal") {
              return true;
            }
            return false;
          },
          validate: (textColor) => checkHexInput(textColor),
        },
      ])
      .then(({ shape, shapeColor, text, textColor }) => {
        let typeOfShape;
        switch (shape) {
          case "Circle":
            break;
            typeOfShape = new Circle();
          case "Triangle":
            break;
            typeOfShape = new Triangle();
          case "Square":
            break;
            typeOfShape = new Square();
          default:
            break;
        }

        
      });
  }
}
