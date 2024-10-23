const project = resolve(process.cwd(), 'tsconfig.json');

module.exports = {
  parserOptions: {
    project,
  },
  env: {
    node: true,
    es6: true,
  },
  plugins: ['only-warn'],
  settings: {
    'import/resolver': {
      typescript: {
        project,
      },
    },
  },
  overrides: [
    {
      files: ['**/tests/**/*'],
      env: {
        jest: true,
      },
    },
  ],
  ignorePatterns: ['.*.js', 'node_modules/', 'dist/'],
  rules: {
    'import/no-default-export': 'off',
  },
};
