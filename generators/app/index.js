'use strict';
const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  writing() {
    this.fs.copy(
      this.templatePath('README.md'),
      this.destinationPath('README.md')
    );

    this.fs.copy(
      this.templatePath('.babelrc'),
      this.destinationPath('.babelrc')
    );

    this.fs.copy(
      this.templatePath('.npmrc'),
      this.destinationPath('.npmrc')
    );

    this.fs.copy(
      this.templatePath('package.json'),
      this.destinationPath('package.json')
    );

    this.fs.copy(
      this.templatePath('webpack.config.js'),
      this.destinationPath('webpack.config.js')
    );

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
  }

  end() {
    this.log();
    this.log('Mini webpack project with React is ready!');
    this.log('Please run \'yarn\' or \'npm install\' to install dependencies,');
    this.log(
      'And check the README.md file for more information (build procedures, etc.)'
    );
  }
};
