/* eslint-disable import/no-commonjs */
const commonPresets = ["@babel/preset-env", "@babel/preset-react"];
const commonPlugins = [
  "@babel/plugin-proposal-object-rest-spread",
  "@babel/plugin-proposal-class-properties"
];

module.exports = {
  presets: commonPresets,
  plugins: [...commonPlugins],
  env: {
    test: {
      presets: commonPresets,
      plugins: [...commonPlugins]
    }
  }
};
