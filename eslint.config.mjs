import nextVitals from 'eslint-config-next/core-web-vitals'

const nodeGlobals = {
  __dirname: 'readonly',
  __filename: 'readonly',
  console: 'readonly',
  module: 'readonly',
  process: 'readonly',
  require: 'readonly',
}

const config = [
  {
    ignores: ['.next/**', 'node_modules/**', 'out/**'],
  },
  ...nextVitals,
  {
    files: ['*.cjs', 'scripts/**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'commonjs',
      globals: nodeGlobals,
    },
  },
]

export default config