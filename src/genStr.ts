import {completeCode, GenType, typeReg, getApiStrSingle, apiAlias} from './main'
import {prettierFormat} from '@/utils/format'
export const genTemplateStr = (code: string, genType: GenType, apiAliasValue:string) => {
	completeCode[genType] = code
	apiAlias.value = apiAliasValue
	let typeRegRes: null | RegExpExecArray = null
	let str = ''
	while ((typeRegRes = typeReg.exec(code)) !== null) {
		const apiType = typeRegRes[1].toLocaleLowerCase()
		const contentStr = typeRegRes[2]
		str += getApiStr(contentStr, apiType, genType)
	}
	return prettierFormat(str, 'graphql')
}

const getApiStr = (code: string, apiType: string, genType: GenType) => {
	const apiArr = getApiStrSingle(code, apiType, genType)
	return apiArr.map((item) => `${item.value}`).join('\n')
}
