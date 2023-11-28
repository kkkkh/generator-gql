export declare const apiAlias: import("vue").Ref<string>;
export declare const completeCode: {
    fileCode: string;
    varCode: string;
};
export type GenType = keyof typeof completeCode;
export declare const typeReg: RegExp;
export declare const getApiStrSingle: (code: string, apiType: string, genType: GenType) => {
    name: string;
    value: string;
}[];
