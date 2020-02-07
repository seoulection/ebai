module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  setupFilesAfterEnv: ['./jest.setup.js'],
  testMatch: ["**/tests/**/**/*.spec.{j,t}s?(x)"],
  restoreMocks: true
}
