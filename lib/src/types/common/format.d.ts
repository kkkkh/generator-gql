declare type VueParserType = 'vue';
declare type BabelParserType = 'babel';
declare type GraphqlParserType = 'graphql';
export declare type ParserType = VueParserType | BabelParserType | GraphqlParserType;
export declare type ParseHandleType = {
    [P in ParserType]: (p: string) => string;
};
export {};
