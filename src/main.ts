import {ParamsType} from '@/types'
import {ref, reactive} from 'vue'

export const apiAlias = ref('result')
export const completeCode = reactive({
	fileCode: '',
	varCode: '',
})

export type GenType = keyof typeof completeCode

export const typeReg = /extend\s+type\s+([a-zA-Z]+)\s+{([\s\S]*?)}/g

export const getApiStrSingle = (code: string, apiType: string, genType: GenType): {name: string; value: string}[] => {
	// 进行分组
	const groupRes = getGroup(code)
	// 对每一组数据进行处理
	const apiArr = groupRes.map((item) => {
		const apiNameStr = getApiNameStr(item)
		const apiParamsStr = getApiParamsStr(item)
		const apiParamsRes = getApiParamsRes(item, genType)
		return getApiTemplate(apiType, apiNameStr, apiParamsStr, apiParamsRes)
	})
	return apiArr
}

const getGroup = (str: string) => {
	const apiSplitReg = /\s*[\n\r]\s*/
	// 过滤注释 和 换行符
	const filtergReg = /^#/
	return str.split(apiSplitReg).filter((groupItem) => !filtergReg.test(groupItem) && groupItem !== '')
}

const getApiNameStr = (code: string) => {
	const paramsReg = /([a-zA-Z]+)\s*\(/
	const paramsRes = paramsReg.exec(code)
	if (paramsRes) {
		return paramsRes[1]
	} else {
		console.log(new Error('未找到Api Name'))
		return ''
	}
}

const getApiParamsStr = (code: string) => {
	const paramsReg = /\([\s\S]+\)/
	const paramsRes = paramsReg.exec(code)
	const params: ParamsType = {
		paramsVar: '',
		paramsValue: '',
	}
	if (paramsRes) {
		params.paramsVar = paramsRes[0].replace(/([a-zA-Z]+:)/g, '$$$1')
		params.paramsValue = paramsRes[0].replace(/([a-zA-Z]+)(:\s*)(\[?[a-zA-Z]+!?\]?!?)(,?)/g, '$1$2$$$1$4')
	}
	return params
}

const getApiParamsRes = (code: string, genType: GenType) => {
	const resReg = /\)\s*:\s*([a-zA-Z]+)/
	const res = resReg.exec(code)
	if (res) {
		return FieldTypeTransform(res[1], genType)
	} else {
		return ''
	}
}

const getApiTemplate = (apiType: string, name: string, {paramsVar, paramsValue}: ParamsType, apiParamsRes: string) => {
	return {
		name,
		value: `${apiType} ${name}${paramsVar}{
        	${apiAlias.value}:${name}${paramsValue}
            ${apiParamsRes}
		}`,
	}
}
const FieldTypeTransform = (type: string, genType: GenType, isFirst = 0) => {
	isFirst++
	const typeReg = new RegExp(`type\\s*${type}\\s*{([\\s\\S]*?)}`)
	const res = typeReg.exec(completeCode[genType])
	if (res && res[1]) {
		const resArr = getGroup(res[1])
		const typeRes: string = resArr
			.map((item) => {
				return item.replace(/:\s*\[?\s*([a-zA-Z]+!?)\s*\]?!?/g, (macth: string, code: string) => {
					return FieldTypeTransform(code, genType, isFirst)
				})
			})
			.join('\n')
		return `{
            ${typeRes}
        }`
	} else {
		return isFirst === 1
			? `{
			code
			msg
			data
		}`
			: ''
	}
}
