module.exports = {
  parser: 'babel-eslint',

  env: {
    browser: true,
    commonjs: true,
    es6: true,
    jest: true,
    node: true
  },

  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      experimentalDecorators: true,
    }
  },


  rules: {
    'eqeqeq': 1,
    'no-div-regex': 1,
    'no-eq-null': 1,
    'no-eval': 1,
    'no-catch-shadow': 1,
    'no-label-var': 1,
    'no-shadow-restricted-names': 1,
    'no-undef': 1,
    'no-undef-init': 1,
    'no-undefined': 1,
    'no-unused-vars': 1,
    'semi-spacing': 1,
    'comma-spacing': 0,
    'no-lonely-if': 1,
    'semi': 0
  }
}
