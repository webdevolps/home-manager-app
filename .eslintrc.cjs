module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  plugins: ['react-refresh', 'security', 'sonarjs', 'no-secrets'],
  rules: {
    'security/detect-object-injection': 'off',
    'security/detect-non-literal-require': 'warn',
    'security/detect-eval-with-expression': 'error',
    'sonarjs/no-duplicate-string': 'warn',
    'sonarjs/cognitive-complexity': ['warn', 15],
    'no-secrets/no-secrets': 'error',
  },
  overrides: [
    {
      files: ['__tests__/**/*.ts', '__tests__/**/*.tsx'],
      rules: {
        '@typescript-eslint/no-explicit-any': 'off',
        'sonarjs/no-duplicate-string': 'off',
      },
    },
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
}
