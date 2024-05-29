module.exports = {
  root: true,
  plugins: ['react-hooks', '@typescript-eslint', 'sonarjs'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:sonarjs/recommended-legacy',
  ],
  parser: '@typescript-eslint/parser',
  rules: {
    'react-hooks/exhaustive-deps': 'warn',
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-unused-vars': 'error',
    'import/order': 'off',
  },
  ignorePatterns: [
    '.eslintrc.js',
    'babel.config.js',
    'metro.config.js',
    'tailwind.config.js',
    'theme.js',
    'commitlint.config.js',
  ],
};
