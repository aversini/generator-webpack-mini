module.exports = {
  bump: {
    nextPossible: [
      {
        pos: 0,
        type: "prepatch",
        identifier: "beta",
        prompt: (type, version) =>
          `[${type}] ..... marking current as beta (${version})`,
        default: true,
      },
      {
        pos: 1,
        type: "patch",
        prompt: (type, version) =>
          `[${type}] ........ only defect fixes (${version})`,
      },
      {
        pos: 3,
        type: "minor",
        prompt: (type, version) =>
          `[${type}] ........ at least one new feature (${version})`,
      },
      {
        pos: 4,
        type: "major",
        prompt: (type, version) =>
          `[${type}] ........ breaking change(s) (${version})`,
      },
      {
        pos: 5,
        type: "separator",
      },
      {
        pos: 6,
        type: "custom",
        prompt: (type) => `[${type}] ....... enter a custom version`,
      },
    ],
  },
  release: {
    prerelease: [
      {
        name: "run tests",
        command: "npm run test",
      },
      {
        name: "generate changelog",
        command: "npm run changelog",
      },
    ],
  },
};
