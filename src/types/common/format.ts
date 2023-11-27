type VueParserType = 'vue'
type BabelParserType = 'babel'
type GraphqlParserType = 'graphql'
export type ParserType = VueParserType | BabelParserType | GraphqlParserType
export type ParseHandleType = {
	[P in ParserType]: (p: string) => string
}
