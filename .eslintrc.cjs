module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'airbnb/base',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:import/recommended',
    'plugin:prettier/recommended',
    'prettier',
  ],
  plugins: ['react', 'prettier', 'import'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: {
    react: { version: '18.3' },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        moduleDirectory: ['node_modules', 'src/'],
      },
    },
  },
  rules: {
    'prettier/prettier': ['error', { endOfLine: 'auto' }],
    'import/prefer-default-export': 0,
    'react/react-in-jsx-scope': 0,
    'react/prop-types': 0,
    'no-continue': 0,
    'no-restricted-syntax': 0,
    'guard-for-in':0,
    'import/no-unresolved': 0,
    'import/no-absolute-path': 0,
  },
};
