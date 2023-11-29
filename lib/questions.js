// Adding all necessary files and modules
const inquirer = require("inquirer");
const colors = require("./colors");
const SVG = require("./svg");
const { writeFile } = require("fs/promises");
const { Circle, Triangle, Square } = require("./shape");

// Function to check if the color input is one that is in the array in the colors.js file
const checkColorInput = (input) => {
  let lowercase = input.toLowerCase();
  let totalColors = colors.length;
  for (let i = 0; i < totalColors; i++) {
    if (lowercase.indexOf(colors[i]) != -1) {
      return true;
    }
  }
  // Error message that lets the user know that they need to try again
  return console.log("\n That color is invalid\n Please try again");
};

// Function to check the hex code and using RegEx to check if its a valid hexadecimal code
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

// Creating a class that has a run function to use to start the logo maker
// Inside is a long inquirer prompt that takes in all the necessary data as well as validating any input to make sure it is valid
//
class Questions {
  run() {
    return (
      inquirer
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
        // This then will take these 4 variables and uses a switch case to check which shape the user chooses
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

          // Here the color of the shape is set with this function call
          typeOfShape.setColor(color);

          // Here we create a new SVG object so we can create the svg file
          const svg = new SVG();
          svg.setTextContent(textInput, textColor);
          svg.setShape(typeOfShape);

          // This will write the file to the examples folder with the name of logo.svg and it gets the text from the svg.render() using a template literal to input the correct text
          return writeFile("./output/logo.svg", svg.render());
        })
        // This lets the user know that the logo was created successfully
        .then(() => console.log("Logo successfully created"))
        // This will catch any errors that are thrown and let the user know what happened
        .catch((err) => console.log(err))
    );
  }
}

// Exporting the module to be used in other javascript files
module.exports = Questions;
