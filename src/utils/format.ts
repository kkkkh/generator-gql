import {ParserType, ParseHandleType} from '@/types'
// import prettier from 'https://unpkg.com/prettier@2.6.2/esm/standalone.mjs'
// import parserHtml from 'https://unpkg.com/prettier@2.6.2/esm/parser-html.mjs'
// import parserBabel from 'https://unpkg.com/prettier@2.6.2/esm/parser-babel.mjs'
// import parserTs from 'https://unpkg.com/prettier@2.6.2/esm/parser-typescript.mjs'
// import parserGraphql from 'https://unpkg.com/prettier@2.6.2/esm/parser-graphql.mjs'

import prettier from 'prettier'
// import parserHtml from 'prettier/esm/parser-html.js'
// import parserBabel from 'prettier/esm/parser-babel.mjs'
// import parserTs from 'prettier/esm/parser-typescript.mjs'
// import parserGraphql from 'prettier/esm/parser-graphql.mjs'
import parserHtml from 'prettier/parser-html.js'
import parserBabel from 'prettier/parser-babel.js'
import parserTs from 'prettier/parser-typescript.js'
import parserGraphql from 'prettier/parser-graphql.js'

export const prettierFormat = (code: string, parserType: ParserType = 'vue') => {
	return parserHandle[parserType](code)
}

const parserHandle: ParseHandleType = {
	vue: (code: string) => {
		return prettier.format(code, {
			parser: 'vue',
			plugins: [parserBabel, parserHtml, parserTs],
			arrowParens: 'avoid',
			bracketSameLine: true,
			bracketSpacing: false,
			embeddedLanguageFormatting: 'auto',
			htmlWhitespaceSensitivity: 'ignore',
			insertPragma: false,
			jsxSingleQuote: true,
			printWidth: 80,
			proseWrap: 'never',
			quoteProps: 'preserve',
			requirePragma: false,
			semi: true,
			singleQuote: true,
			tabWidth: 2,
			trailingComma: 'all',
			useTabs: false,
			vueIndentScriptAndStyle: true,
		})
	},
	babel: (code: string) => {
		return prettier.format(code, {
			parser: 'babel',
			plugins: [parserBabel],
			arrowParens: 'avoid',
			bracketSameLine: true,
			bracketSpacing: false,
			embeddedLanguageFormatting: 'auto',
			htmlWhitespaceSensitivity: 'ignore',
			insertPragma: false,
			jsxSingleQuote: true,
			printWidth: 80,
			proseWrap: 'never',
			quoteProps: 'preserve',
			requirePragma: false,
			semi: true,
			singleQuote: true,
			tabWidth: 2,
			trailingComma: 'all',
			useTabs: false,
			vueIndentScriptAndStyle: true,
		})
	},
	graphql: (code: string) => {
		return prettier.format(code, {
			parser: 'graphql',
			plugins: [parserHtml, parserGraphql],
			arrowParens: 'avoid',
			bracketSameLine: true,
			bracketSpacing: false,
			embeddedLanguageFormatting: 'auto',
			htmlWhitespaceSensitivity: 'ignore',
			insertPragma: false,
			jsxSingleQuote: true,
			printWidth: 80,
			proseWrap: 'never',
			quoteProps: 'preserve',
			requirePragma: false,
			semi: true,
			singleQuote: true,
			tabWidth: 2,
			trailingComma: 'all',
			useTabs: false,
			vueIndentScriptAndStyle: true,
		})
	},
}
