module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  plugins: ['react-refresh', 'security', 'sonarjs'],
  rules: {
    'security/detect-object-injection': 'off',
    'security/detect-non-literal-require': 'warn',
    'security/detect-eval-with-expression': 'error',
    'sonarjs/no-duplicate-string': 'warn',
    'sonarjs/cognitive-complexity': ['warn', 15],
  },
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
}
