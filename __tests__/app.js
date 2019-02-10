'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('generator-webpack-mini:app (React)', () => {
  it('does not generate a project', () => {
    // The object returned acts like a promise, so
    // return it to wait until the process is done
    return helpers
      .run(path.join(__dirname, '../generators/app'))
      .withPrompts({continue: false}) // Mock the prompt answers
      .then(function () {
        assert.noFile([
          '.babelrc',
          '.gitignore',
          'README.md',
          'package.json',
          'webpack.config.js',
          'src/favicon.ico',
          'src/index.html',
          'src/testbed.css',
          'src/testbed.jsx',
          'src/index.jsx'
        ]);
      });
  });
  it('generate a wp3 project', () => {
    // The object returned acts like a promise, so
    // return it to wait until the process is done
    return helpers
      .run(path.join(__dirname, '../generators/app'))
      .withPrompts({continue: true}) // Mock the prompt answers
      .withPrompts({wp4: false}) // Mock the prompt answers
      .then(function () {
        assert.file([
          '.babelrc',
          '.gitignore',
          'README.md',
          'package.json',
          'webpack.config.js',
          'src/favicon.ico',
          'src/index.html',
          'src/testbed.css',
          'src/testbed.jsx',
          'src/index.jsx'
        ]);
      });
  });
  it('generate a wp4 project', () => {
    // The object returned acts like a promise, so
    // return it to wait until the process is done
    return helpers
      .run(path.join(__dirname, '../generators/app'))
      .withPrompts({continue: true}) // Mock the prompt answers
      .then(function () {
        assert.file([
          '.babelrc',
          '.gitignore',
          'README.md',
          'package.json',
          'webpack.config.js',
          'src/favicon.ico',
          'src/index.html',
          'src/testbed.css',
          'src/testbed.jsx',
          'src/index.jsx'
        ]);
      });
  });
});
