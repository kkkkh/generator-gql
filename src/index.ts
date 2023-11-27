import fs from 'fs'
import {prettierFormat} from '@/utils/format'
import {completeCode, GenType, typeReg, getApiStrSingle} from '@/main'
import ora from 'ora'
import {OptionValues} from 'commander'
import path from 'path'

let codegenUseStr = ''
let codegenMutateStr = ''

export const genTemplateFile = async (code: string, genType: GenType, options: OptionValues) => {
	const dest = options.destDirPath
	const spinner = ora('gen gql file start').start()
	completeCode[genType] = code
	let typeRegRes: null | RegExpExecArray = null
	if (await fs.existsSync(`./${dest}`)) {
		await fs.rmSync(`./${dest}`, {recursive: true})
	}
	Promise.all(
		path
			.resolve(dest)
			.split(path.sep)
			.reduce((before: string, cur: string) => {
				const pathTmp = path.join(before, cur + path.sep)
				if (!fs.existsSync(pathTmp)) {
					fs.mkdirSync(pathTmp)
				}
				return path.join(before, cur + path.sep)
			}, '')
	).then(async () => {
		while ((typeRegRes = typeReg.exec(code)) !== null) {
			const apiType = typeRegRes[1].toLocaleLowerCase()
			const contentStr = typeRegRes[2]
			await genApiFile(contentStr, apiType, genType, options, spinner)
		}
		const codegenStr = genTemplateCodegenVue()
		try {
			await fs.writeFileSync(`./${dest}/codegen.vue`, prettierFormat(codegenStr))
			spinner.succeed('gen vue file success')
		} catch (err) {
			console.log(err)
			spinner.fail('gen vue file fail')
		}
	})
}

const genApiFile = async (code: string, apiType: string, genType: GenType, options: OptionValues, spinner: ora.Ora) => {
	const dest = options.destDirPath
	const ext = options.ext
	const apiArr = getApiStrSingle(code, apiType, genType)
	for (const api of apiArr) {
		genTemplateUse(api.name, apiType)
		const value = prettierFormat(api.value, 'graphql')
		try {
			await fs.writeFileSync(`./${dest}/${api.name}.${ext}`, value)
			spinner.succeed(`gen ${api.name}.gql file success`)
		} catch (err) {
			console.log(err)
			spinner.fail(`gen ${api.name}.gql file fail`)
		}
	}
}

const genTemplateUse = (apiName: string, apiType: string) => {
	const useApiType = `${apiType.slice(0, 1).toLocaleUpperCase()}${apiType.slice(1)}`
	const useApi = `use${apiName.slice(0, 1).toLocaleUpperCase()}${apiName.slice(1)}${useApiType}`
	codegenUseStr += `${useApi},`
	codegenMutateStr += apiType === 'mutation' ? `const {mutate: ${apiName}${useApiType}} = ${useApi}({})\n` : ''
}
const genTemplateCodegenVue = () => {
	return `
	<script setup lang="ts">
		import {${codegenUseStr}} from '~~/codegen'
		${codegenMutateStr}
	</script>
	`
}
