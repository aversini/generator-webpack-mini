'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('generator-webpack-mini:app (React)', () => {
  beforeAll(() => {
    return helpers
      .run(path.join(__dirname, '../generators/app'));
  });

  it('creates files', () => {
    assert.file([
      '.babelrc',
      '.npmrc',
      'README.md',
      'package.json',
      'webpack.config.js',
      'src/index.html',
      'src/testbed.css',
      'src/testbed.jsx',
      'src/index.jsx'
    ]);
  });
});
