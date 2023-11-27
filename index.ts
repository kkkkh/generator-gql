#!/usr/bin/env node
import {readFile} from './src/read'
import {program} from 'commander'
import ora from 'ora'
const spinner = ora('gen start').start()

program
	.requiredOption('-f, --fileName <string>', 'file name')
	.option('-e, --ext [value]', 'extension file to use', 'gql')
	.option('-d, --destDirPath [value]', 'dir you want to store the generated queries', 'gen-gql')
program.parse(process.argv)

const options = program.opts()

readFile(options)
	.then(() => {
		spinner.succeed('gen success')
	})
	.catch(() => {
		spinner.fail('gen error')
	})

	