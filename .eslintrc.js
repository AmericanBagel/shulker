module.exports = {
  extends: [
    'eslint-config-prettier',
    'prettier',
    'standard'
  ],
  rules: {
    'no-unused-vars': 'off'
  },
  ignorePatterns: ['temp/**']
}
