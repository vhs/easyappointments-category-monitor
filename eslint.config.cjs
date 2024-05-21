const eslint = require('@eslint/js')
const tseslint = require('typescript-eslint')
const eslintConfigPrettier = require('eslint-config-prettier')
const loveConfig = require('eslint-config-love')

module.exports = tseslint.config(
    eslint.configs.recommended,
    ...tseslint.configs.recommended,
    loveConfig,
    eslintConfigPrettier,
    {
        files: ['src/*.ts', 'src/**/*.ts']
    }
)
