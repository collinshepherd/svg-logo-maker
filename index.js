// Taking the export from the questions.js file to prompt the user
const Questions = require("./lib/questions");

// Creating the variable using a new object of the questions class
const questions = new Questions();

// Calling the function to initiate the prompt and starting the creation of the logo
questions.run();
