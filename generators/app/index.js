'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  prompting() {
    this.log(
      yosay('Welcome to the ' + chalk.blue('webpack-mini') + ' generator!')
    );

    const prompts = [
      {
        type: 'confirm',
        name: 'wp4',
        message: 'Targeting Webpack v4+?',
        default: true
      },
      {
        type: 'confirm',
        name: 'continue',
        message: 'About to generate code in the current folder, continue?',
        default: true
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    if (this.props.continue) {
      this.fs.copy(
        this.templatePath('README.md'),
        this.destinationPath('README.md')
      );

      this.fs.copy(
        this.templatePath('.babelrc'),
        this.destinationPath('.babelrc')
      );

      this.fs.copy(
        this.templatePath('.gitignore'),
        this.destinationPath('.gitignore')
      );

      if (this.props.wp4) {
        this.fs.copy(
          this.templatePath('wp4.webpack.config.js'),
          this.destinationPath('webpack.config.js')
        );
        this.fs.copy(
          this.templatePath('wp4.package.json'),
          this.destinationPath('package.json')
        );
      } else {
        this.fs.copy(
          this.templatePath('wp3.webpack.config.js'),
          this.destinationPath('webpack.config.js')
        );
        this.fs.copy(
          this.templatePath('wp3.package.json'),
          this.destinationPath('package.json')
        );
      }

      this.fs.copy(
        this.templatePath('src', 'index.html'),
        this.destinationPath('src', 'index.html')
      );

      this.fs.copy(
        this.templatePath('src', 'testbed.css'),
        this.destinationPath('src', 'testbed.css')
      );

      this.fs.copy(
        this.templatePath('src', 'index.jsx'),
        this.destinationPath('src', 'index.jsx')
      );

      this.fs.copy(
        this.templatePath('src', 'testbed.jsx'),
        this.destinationPath('src', 'testbed.jsx')
      );

      this.fs.copy(
        this.templatePath('src', 'favicon.ico'),
        this.destinationPath('src', 'favicon.ico')
      );
    }
  }

  end() {
    if (this.props.continue) {
      const introduction = `Mini webpack project with React is ready!`;
      const howToInstall = `Please run ${chalk.blue(
        'npm install'
      )} or ${chalk.blue('yarn')} to install dependencies.`;
      const postInstall = `Check the ${chalk.blue(
        'README.md'
      )} file for more information (build procedures, etc.)`;

      this.log();
      this.log(yosay(introduction));
      this.log(howToInstall);
      this.log(postInstall);
    } else {
      this.log('Bye then...');
    }
  }
};
