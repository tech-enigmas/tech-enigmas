const inquirer = require("inquirer");
const { sign } = require("jsonwebtoken");

function signIn() {
inquirer
  .prompt([
    {
      name: "user_name",
      type: "input",
      message: "What is your name?",
    },
    {
      name: 'password',
      type: 'input',
      message: 'Please pick a password',
    },
    {
      name: 'powers',
      type: 'confirm',
      message: 'Will you have the powers of an Administrator?'
    },
  
  ])

  .then((answer) => {
    console.log(`Hello ${answer.user_name} your password is ${answer.password}. You have ${answer.powers} admin powers`);
  });
}

function contributorAccess() {

}




signIn();
contributorAccess();