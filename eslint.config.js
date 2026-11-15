const browserGlobals = Object.fromEntries(
  [
    'AbortController',
    'FormData',
    'Headers',
    'URL',
    'URLSearchParams',
    'console',
    'document',
    'fetch',
    'localStorage',
    'navigator',
    'window',
  ].map((name) => [name, 'readonly']),
)

export default [
  {
    ignores: ['dist/**', 'node_modules/**'],
  },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: browserGlobals,
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    rules: {
      curly: ['error', 'all'],
      eqeqeq: ['error', 'always'],
      'no-alert': 'error',
      'no-console': ['error', { allow: ['error', 'warn'] }],
      'no-duplicate-imports': 'error',
      'no-debugger': 'error',
      'no-implicit-coercion': 'error',
      'no-undef': 'error',
      'no-unreachable': 'error',
      'no-unused-vars': [
        'error',
        {
          args: 'all',
          argsIgnorePattern: '^_',
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
      'no-var': 'error',
      'prefer-const': 'error',
    },
  },
]
