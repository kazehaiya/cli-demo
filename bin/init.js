#!/usr/bin/env node
const { Command } = require('commander');
const chalk = require('chalk');
const ora = require('ora');
const CFonts = require('cfonts');

CFonts.say('Hello world!', {
  font: 'block', // define the font face
  align: 'left', // define text alignment
  colors: ['system'], // define all colors
  background: 'transparent', // define the background color, you can also use `backgroundColor` here as key
  letterSpacing: 1, // define letter spacing
  lineHeight: 1, // define the line height
  space: true, // define if the output text should have empty lines on top and on the bottom
  maxLength: '0', // define how many character can be on one line
  gradient: ['red', '#f80'], // define your two gradient colors
  independentGradient: false, // define if you want to recalculate the gradient for each new line
  transitionGradient: false, // define if this is a transition between colors directly
  env: 'node', // define the environment CFonts is being executed in
});

// 创建 Commander 实例
const program = new Command();

// Head Line Tips
program.name('myInit').usage('<command> [options]');

// Version Options
const currentVersion = require('../package.json').version;
program.version(
  currentVersion,
  '-v, --version',
  chalk.blue('Output the current version'),
);

// Help Options
program.helpOption('-h, --help', 'Output usage information');

// Create Command
program
  .command('create <projectName> [opts]')
  .description('Create a program use remote git model')
  .option('-i, --inhert', 'create an existed project')
  .action((name, opts) => {
    console.log(`The project name is "${name}", and the option is ${opts}`);
  });

program
  .command('hello')
  .description('Print "hello world" to terminal')
  .action(() => {
    require('./hello-world');
  });

program
  .command('help')
  .description('Output usage information')
  .action(() => {
    program.help();
  });

program
  .command('inq')
  .description('Input with interaction')
  .action(async () => {
    const answers = await require('../lib/user-info')();

    // 结果： { first_name: '', last_name: '', sex: '' }
    console.log(answers);
  });

program
  .command('download')
  .description('Download Vue Template')
  .action(async () => {
    const spinner = ora();

    try {
      spinner.start(chalk.blue('模板下载中……'));
      await require('../lib/download-vue')();
    } catch {
      spinner.fail(chalk.red('下载失败'));
    } finally {
      spinner.succeed(chalk.green('下载完成'));
    }
  });

// Default value is "process.argv"
program.parse();

// None Match
if (!program.args.length) {
  program.help();
}
