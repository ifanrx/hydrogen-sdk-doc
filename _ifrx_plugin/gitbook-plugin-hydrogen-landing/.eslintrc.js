module.exports = {
  root: true,
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
    mocha: true,
  },
  extends: ['standard'],
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module',
    allowImportExportEverywhere: true,
  },
  globals: {
    $: true,
  },
  plugins: [
  ],
  rules: {
    'camelcase': 0,
    'eqeqeq': 0,
    'max-len': ['error', 120],
    'comma-dangle': ['error', 'always-multiline'],
    'space-before-function-paren': ['error', 'never'],
    'object-curly-spacing': ['error', 'never'],
    'arrow-parens': ['error', 'as-needed'],
    indent: ['error', 2],
    quotes: ['error', 'single'],
    'no-console': 0,
  }
}
