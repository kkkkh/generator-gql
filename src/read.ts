import fs from 'fs'
// import path from 'path'
import {genTemplateFile} from './index'
import ora from 'ora'
import {OptionValues} from 'commander'

export const readFile = async (options: OptionValues) => {
	const fileName = options.fileName
	const spinner = ora('start read file').start()
	try {
		const data: Buffer = await fs.readFileSync(fileName)
		spinner.succeed('read file success')
		const content = data.toString()
		await genTemplateFile(content, 'fileCode', options)
	} catch (error) {
		spinner.fail('read file error')
		console.log(error)
		throw error
	}
}
