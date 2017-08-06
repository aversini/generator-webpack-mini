'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('generator-webpack-mini:app', () => {
  beforeAll(() => {
    return helpers
      .run(path.join(__dirname, '../generators/app'))
      .withPrompts({react: true});
  });

  it('creates files', () => {
    assert.file([
      'README.md',
      'package.json',
      'webpack.config.js',
      'src/index.html',
      'src/testbed.css',
      'src/testbed.jsx'
    ]);
  });
});
