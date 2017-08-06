'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

const devDependencies = {
  react: {
    'babel-core': '^6.25.0',
    'babel-loader': '^7.1.1',
    'babel-preset-es2015': '^6.24.1',
    'babel-preset-react': '^6.24.1',
    'clean-webpack-plugin': '^0.1.16',
    'css-loader': '^0.28.4',
    'extract-text-webpack-plugin': '^3.0.0-rc.2',
    'html-webpack-plugin': '^2.29.0',
    inliner: '^1.12.3',
    'npm-run-all': '^4.0.2',
    react: '^15.6.1',
    'react-dom': '^15.6.1',
    'resolve-url-loader': '^2.1.0',
    'style-loader': '^0.18.2',
    webpack: '^3.3.0',
    'webpack-dev-server': '^2.6.1'
  },
  js: {
    'babel-core': '^6.25.0',
    'babel-loader': '^7.1.1',
    'babel-preset-es2015': '^6.24.1',
    'babel-preset-react': '^6.24.1',
    'clean-webpack-plugin': '^0.1.16',
    'css-loader': '^0.28.4',
    'extract-text-webpack-plugin': '^3.0.0-rc.2',
    'html-webpack-plugin': '^2.29.0',
    inliner: '^1.12.3',
    'npm-run-all': '^4.0.2',
    'resolve-url-loader': '^2.1.0',
    'style-loader': '^0.18.2',
    webpack: '^3.3.0',
    'webpack-dev-server': '^2.6.1'
  }
};

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

  writing() {
    this.fs.copyTpl(
      this.templatePath('common', 'README.md'),
      this.destinationPath('README.md'),
      {
        entry: this.props.react ? 'testbed.jsx' : 'testbed.js'
      }
    );

    this.fs.copy(
      this.templatePath('common', '.babelrc'),
      this.destinationPath('.babelrc')
    );

    this.fs.copyTpl(
      this.templatePath('common', 'package.json'),
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
        devDependencies: this.props.react ?
          devDependencies.react :
          devDependencies.js
      },
      null,
      2
    );

    this.fs.copyTpl(
      this.templatePath('common', 'webpack.config.js'),
      this.destinationPath('webpack.config.js'),
      {
        entry: this.props.react ? './src/testbed.jsx' : './src/testbed.js'
      }
    );

    this.fs.copyTpl(
      this.templatePath('common', 'src', 'index.html'),
      this.destinationPath('src', 'index.html'),
      {
        introduction: this.props.react ?
          '&#9733; Standalone React Testbed &#9733;' :
          '&#9733; Standalone HTML/CSS/JS Testbed &#9733;'
      }
    );

    this.fs.copy(
      this.templatePath('common', 'src', 'testbed.css'),
      this.destinationPath('src', 'testbed.css')
    );

    if (this.props.react) {
      this.fs.copy(
        this.templatePath('testbed-react', 'src', 'testbed.jsx'),
        this.destinationPath('src', 'testbed.jsx')
      );
    } else {
      this.fs.copy(
        this.templatePath('testbed-js', 'src', 'testbed.js'),
        this.destinationPath('src', 'testbed.js')
      );
    }
  }

  end() {
    this.log();
    this.log('Mini webpack project is ready!');
    this.log('Please run \'yarn\' or \'npm install\' to install dependencies,');
    this.log('And check the README.md file for more information (build procedures, etc.)');
  }
};
