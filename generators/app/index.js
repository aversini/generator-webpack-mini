'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay('Welcome to the ' + chalk.red('webpack-mini') + ' generator!')
    );

    const prompts = [
      {
        type: 'confirm',
        name: 'react',
        message: 'Add support for React?',
        default: true
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  configuring() {
    const devDependencies = {
      js: {
        'babel-core': '^6.26.0',
        'babel-loader': '^7.1.2',
        'babel-preset-env': '^1.6.1',
        'clean-webpack-plugin': '^0.1.17',
        'css-loader': '^0.28.7',
        'extract-text-webpack-plugin': '^3.0.2',
        'html-webpack-plugin': '^2.30.1',
        inliner: '^1.12.5',
        'npm-run-all': '^4.1.2',
        'style-loader': '^0.19.0',
        webpack: '^3.8.1',
        'webpack-dev-server': '^2.9.4'
      },
      react: {
        'babel-preset-react': '^6.24.1',
        react: '^16.1.1',
        'react-dom': '^16.1.1'
      }
    };

    if (this.props.react) {
      this.props.devDependencies = Object.assign(
        {},
        devDependencies.js,
        devDependencies.react
      );
    } else {
      this.props.devDependencies = devDependencies.js;
    }
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath('README.md'),
      this.destinationPath('README.md'),
      {
        entry: this.props.react ? 'testbed.jsx' : 'testbed.js'
      }
    );

    this.fs.copy(
      this.templatePath(this.props.react ? '.babelrc-react' : '.babelrc-js'),
      this.destinationPath('.babelrc')
    );

    this.fs.copyTpl(
      this.templatePath('package.json'),
      this.destinationPath('package.json'),
      {
        description: this.props.react ?
          'Minimal testbed for React with webpack' :
          'Minimal testbed for webpack'
      }
    );

    this.fs.extendJSON(
      this.destinationPath('package.json'),
      {
        devDependencies: this.props.devDependencies
      },
      null,
      2
    );

    this.fs.copyTpl(
      this.templatePath('webpack.config.js'),
      this.destinationPath('webpack.config.js'),
      {
        entry: this.props.react ? './src/testbed.jsx' : './src/testbed.js'
      }
    );

    this.fs.copyTpl(
      this.templatePath('src', 'index.html'),
      this.destinationPath('src', 'index.html'),
      {
        introduction: this.props.react ?
          '&#9733; Standalone React Testbed &#9733;' :
          '&#9733; Standalone HTML/CSS/JS Testbed &#9733;'
      }
    );

    this.fs.copy(
      this.templatePath('src', 'testbed.css'),
      this.destinationPath('src', 'testbed.css')
    );

    if (this.props.react) {
      this.fs.copy(
        this.templatePath('src', 'testbed.jsx'),
        this.destinationPath('src', 'testbed.jsx')
      );
    } else {
      this.fs.copy(
        this.templatePath('src', 'testbed.js'),
        this.destinationPath('src', 'testbed.js')
      );
    }
  }

  end() {
    this.log();
    this.log('Mini webpack project is ready!');
    this.log('Please run \'yarn\' or \'npm install\' to install dependencies,');
    this.log(
      'And check the README.md file for more information (build procedures, etc.)'
    );
  }
};
