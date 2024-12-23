/** @type {import('jest').Config} */
module.exports = {
  verbose: true,
  transform: {
    '\\.css\\.ts$': '@vanilla-extract/jest-transform',
  },
};
