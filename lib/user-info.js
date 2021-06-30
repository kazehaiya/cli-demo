const inquirer = require('inquirer');

module.exports = async () => {
  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'first_name',
      message: "What's your first name",
    },
    {
      type: 'input',
      name: 'last_name',
      message: "And what's your last name",
    },
    {
      type: 'list',
      name: 'sex',
      message: 'Are you a girl or boy',
      choices: ['boy', 'girl'],
    },
  ]);

  return answers;
};
