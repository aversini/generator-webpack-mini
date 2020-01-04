module.exports = {
  extends: [
    "versini",
    "versini/rules/react/off",
    "versini/rules/react-a11y/off",
    "prettier"
  ],
  rules: {
    "max-len": [
      "error",
      {
        code: 80,
        tabWidth: 2,
        comments: 110,
        ignoreTrailingComments: true,
        ignoreUrls: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreRegExpLiterals: true
      }
    ]
  },
  overrides: [
    {
      files: ["*.test.*"],
      rules: {
        "no-console": "off",
        "no-magic-numbers": "off"
      }
    }
  ]
};
