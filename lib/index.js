/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./index.ts":
/*!******************!*\
  !*** ./index.ts ***!
  \******************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("//#!/usr/bin/env node\n\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst tslib_1 = __webpack_require__(/*! tslib */ \"tslib\");\nconst read_1 = __webpack_require__(/*! ./src/read */ \"./src/read.ts\");\nconst commander_1 = __webpack_require__(/*! commander */ \"commander\");\nconst ora_1 = tslib_1.__importDefault(__webpack_require__(/*! ora */ \"ora\"));\nconst spinner = (0, ora_1.default)('gen start').start();\ncommander_1.program\n    .requiredOption('-f, --fileName <string>', 'file name')\n    .option('-e, --ext [value]', 'extension file to use', 'gql')\n    .option('-d, --destDirPath [value]', 'dir you want to store the generated queries', 'gen-gql');\ncommander_1.program.parse(process.argv);\nconst options = commander_1.program.opts();\n(0, read_1.readFile)(options)\n    .then(() => {\n    spinner.succeed('gen success');\n})\n    .catch(() => {\n    spinner.fail('gen error');\n});\n\n\n//# sourceURL=webpack://generator-gql/./index.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.genTemplateFile = void 0;\nconst tslib_1 = __webpack_require__(/*! tslib */ \"tslib\");\nconst fs_1 = tslib_1.__importDefault(__webpack_require__(/*! fs */ \"fs\"));\nconst format_1 = __webpack_require__(/*! @/utils/format */ \"./src/utils/format.ts\");\nconst main_1 = __webpack_require__(/*! @/main */ \"./src/main.ts\");\nconst ora_1 = tslib_1.__importDefault(__webpack_require__(/*! ora */ \"ora\"));\nconst path_1 = tslib_1.__importDefault(__webpack_require__(/*! path */ \"path\"));\nlet codegenUseStr = '';\nlet codegenMutateStr = '';\nconst genTemplateFile = (code, genType, options) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {\n    const dest = options.destDirPath;\n    const spinner = (0, ora_1.default)('gen gql file start').start();\n    main_1.completeCode[genType] = code;\n    let typeRegRes = null;\n    if (yield fs_1.default.existsSync(`./${dest}`)) {\n        yield fs_1.default.rmSync(`./${dest}`, { recursive: true });\n    }\n    Promise.all(path_1.default\n        .resolve(dest)\n        .split(path_1.default.sep)\n        .reduce((before, cur) => {\n        const pathTmp = path_1.default.join(before, cur + path_1.default.sep);\n        if (!fs_1.default.existsSync(pathTmp)) {\n            fs_1.default.mkdirSync(pathTmp);\n        }\n        return path_1.default.join(before, cur + path_1.default.sep);\n    }, '')).then(() => tslib_1.__awaiter(void 0, void 0, void 0, function* () {\n        while ((typeRegRes = main_1.typeReg.exec(code)) !== null) {\n            const apiType = typeRegRes[1].toLocaleLowerCase();\n            const contentStr = typeRegRes[2];\n            yield genApiFile(contentStr, apiType, genType, options, spinner);\n        }\n        const codegenStr = genTemplateCodegenVue();\n        try {\n            yield fs_1.default.writeFileSync(`./${dest}/codegen.vue`, (0, format_1.prettierFormat)(codegenStr));\n            spinner.succeed('gen vue file success');\n        }\n        catch (err) {\n            console.log(err);\n            spinner.fail('gen vue file fail');\n        }\n    }));\n});\nexports.genTemplateFile = genTemplateFile;\nconst genApiFile = (code, apiType, genType, options, spinner) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {\n    const dest = options.destDirPath;\n    const ext = options.ext;\n    const apiArr = (0, main_1.getApiStrSingle)(code, apiType, genType);\n    for (const api of apiArr) {\n        genTemplateUse(api.name, apiType);\n        const value = (0, format_1.prettierFormat)(api.value, 'graphql');\n        try {\n            yield fs_1.default.writeFileSync(`./${dest}/${api.name}.${ext}`, value);\n            spinner.succeed(`gen ${api.name}.gql file success`);\n        }\n        catch (err) {\n            console.log(err);\n            spinner.fail(`gen ${api.name}.gql file fail`);\n        }\n    }\n});\nconst genTemplateUse = (apiName, apiType) => {\n    const useApiType = `${apiType.slice(0, 1).toLocaleUpperCase()}${apiType.slice(1)}`;\n    const useApi = `use${apiName.slice(0, 1).toLocaleUpperCase()}${apiName.slice(1)}${useApiType}`;\n    codegenUseStr += `${useApi},`;\n    codegenMutateStr += apiType === 'mutation' ? `const {mutate: ${apiName}${useApiType}} = ${useApi}({})\\n` : '';\n};\nconst genTemplateCodegenVue = () => {\n    return `\r\n\t<script setup lang=\"ts\">\r\n\t\timport {${codegenUseStr}} from '~~/codegen'\r\n\t\t${codegenMutateStr}\r\n\t</script>\r\n\t`;\n};\n\n\n//# sourceURL=webpack://generator-gql/./src/index.ts?");

/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.getApiStrSingle = exports.typeReg = exports.completeCode = exports.apiAlias = void 0;\nconst vue_1 = __webpack_require__(/*! vue */ \"vue\");\nexports.apiAlias = (0, vue_1.ref)('result');\nexports.completeCode = (0, vue_1.reactive)({\n    fileCode: '',\n    varCode: '',\n});\nexports.typeReg = /extend\\s+type\\s+([a-zA-Z]+)\\s+{([\\s\\S]*?)}/g;\nconst getApiStrSingle = (code, apiType, genType) => {\n    // 进行分组\n    const groupRes = getGroup(code);\n    // 对每一组数据进行处理\n    const apiArr = groupRes.map((item) => {\n        const apiNameStr = getApiNameStr(item);\n        const apiParamsStr = getApiParamsStr(item);\n        const apiParamsRes = getApiParamsRes(item, genType);\n        return getApiTemplate(apiType, apiNameStr, apiParamsStr, apiParamsRes);\n    });\n    return apiArr;\n};\nexports.getApiStrSingle = getApiStrSingle;\nconst getGroup = (str) => {\n    const apiSplitReg = /\\s*[\\n\\r]\\s*/;\n    // 过滤注释 和 换行符\n    const filtergReg = /^#/;\n    return str.split(apiSplitReg).filter((groupItem) => !filtergReg.test(groupItem) && groupItem !== '');\n};\nconst getApiNameStr = (code) => {\n    const paramsReg = /([a-zA-Z]+)\\s*\\(/;\n    const paramsRes = paramsReg.exec(code);\n    if (paramsRes) {\n        return paramsRes[1];\n    }\n    else {\n        console.log(new Error('未找到Api Name'));\n        return '';\n    }\n};\nconst getApiParamsStr = (code) => {\n    const paramsReg = /\\([\\s\\S]+\\)/;\n    const paramsRes = paramsReg.exec(code);\n    const params = {\n        paramsVar: '',\n        paramsValue: '',\n    };\n    if (paramsRes) {\n        params.paramsVar = paramsRes[0].replace(/([a-zA-Z]+:)/g, '$$$1');\n        params.paramsValue = paramsRes[0].replace(/([a-zA-Z]+)(:\\s*)(\\[?[a-zA-Z]+!?\\]?!?)(,?)/g, '$1$2$$$1$4');\n    }\n    return params;\n};\nconst getApiParamsRes = (code, genType) => {\n    const resReg = /\\)\\s*:\\s*([a-zA-Z]+)/;\n    const res = resReg.exec(code);\n    if (res) {\n        return FieldTypeTransform(res[1], genType);\n    }\n    else {\n        return '';\n    }\n};\nconst getApiTemplate = (apiType, name, { paramsVar, paramsValue }, apiParamsRes) => {\n    return {\n        name,\n        value: `${apiType} ${name}${paramsVar}{\r\n        \t${exports.apiAlias.value}:${name}${paramsValue}\r\n            ${apiParamsRes}\r\n\t\t}`,\n    };\n};\nconst FieldTypeTransform = (type, genType, isFirst = 0) => {\n    isFirst++;\n    const typeReg = new RegExp(`type\\\\s*${type}\\\\s*{([\\\\s\\\\S]*?)}`);\n    const res = typeReg.exec(exports.completeCode[genType]);\n    if (res && res[1]) {\n        const resArr = getGroup(res[1]);\n        const typeRes = resArr\n            .map((item) => {\n            return item.replace(/:\\s*\\[?\\s*([a-zA-Z]+!?)\\s*\\]?!?/g, (macth, code) => {\n                return FieldTypeTransform(code, genType, isFirst);\n            });\n        })\n            .join('\\n');\n        return `{\r\n            ${typeRes}\r\n        }`;\n    }\n    else {\n        return isFirst === 1\n            ? `{\r\n\t\t\tcode\r\n\t\t\tmsg\r\n\t\t\tdata\r\n\t\t}`\n            : '';\n    }\n};\n\n\n//# sourceURL=webpack://generator-gql/./src/main.ts?");

/***/ }),

/***/ "./src/read.ts":
/*!*********************!*\
  !*** ./src/read.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.readFile = void 0;\nconst tslib_1 = __webpack_require__(/*! tslib */ \"tslib\");\nconst fs_1 = tslib_1.__importDefault(__webpack_require__(/*! fs */ \"fs\"));\n// import path from 'path'\nconst index_1 = __webpack_require__(/*! ./index */ \"./src/index.ts\");\nconst ora_1 = tslib_1.__importDefault(__webpack_require__(/*! ora */ \"ora\"));\nconst readFile = (options) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {\n    const fileName = options.fileName;\n    const spinner = (0, ora_1.default)('start read file').start();\n    try {\n        const data = yield fs_1.default.readFileSync(fileName);\n        spinner.succeed('read file success');\n        const content = data.toString();\n        yield (0, index_1.genTemplateFile)(content, 'fileCode', options);\n    }\n    catch (error) {\n        spinner.fail('read file error');\n        console.log(error);\n        throw error;\n    }\n});\nexports.readFile = readFile;\n\n\n//# sourceURL=webpack://generator-gql/./src/read.ts?");

/***/ }),

/***/ "./src/utils/format.ts":
/*!*****************************!*\
  !*** ./src/utils/format.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.prettierFormat = void 0;\nconst tslib_1 = __webpack_require__(/*! tslib */ \"tslib\");\n// import prettier from 'https://unpkg.com/prettier@2.6.2/esm/standalone.mjs'\n// import parserHtml from 'https://unpkg.com/prettier@2.6.2/esm/parser-html.mjs'\n// import parserBabel from 'https://unpkg.com/prettier@2.6.2/esm/parser-babel.mjs'\n// import parserTs from 'https://unpkg.com/prettier@2.6.2/esm/parser-typescript.mjs'\n// import parserGraphql from 'https://unpkg.com/prettier@2.6.2/esm/parser-graphql.mjs'\nconst prettier_1 = tslib_1.__importDefault(__webpack_require__(/*! prettier */ \"prettier\"));\n// import parserHtml from 'prettier/esm/parser-html.js'\n// import parserBabel from 'prettier/esm/parser-babel.mjs'\n// import parserTs from 'prettier/esm/parser-typescript.mjs'\n// import parserGraphql from 'prettier/esm/parser-graphql.mjs'\nconst parser_html_js_1 = tslib_1.__importDefault(__webpack_require__(/*! prettier/parser-html.js */ \"prettier/parser-html.js\"));\nconst parser_babel_js_1 = tslib_1.__importDefault(__webpack_require__(/*! prettier/parser-babel.js */ \"prettier/parser-babel.js\"));\nconst parser_typescript_js_1 = tslib_1.__importDefault(__webpack_require__(/*! prettier/parser-typescript.js */ \"prettier/parser-typescript.js\"));\nconst parser_graphql_js_1 = tslib_1.__importDefault(__webpack_require__(/*! prettier/parser-graphql.js */ \"prettier/parser-graphql.js\"));\nconst prettierFormat = (code, parserType = 'vue') => {\n    return parserHandle[parserType](code);\n};\nexports.prettierFormat = prettierFormat;\nconst parserHandle = {\n    vue: (code) => {\n        return prettier_1.default.format(code, {\n            parser: 'vue',\n            plugins: [parser_babel_js_1.default, parser_html_js_1.default, parser_typescript_js_1.default],\n            arrowParens: 'avoid',\n            bracketSameLine: true,\n            bracketSpacing: false,\n            embeddedLanguageFormatting: 'auto',\n            htmlWhitespaceSensitivity: 'ignore',\n            insertPragma: false,\n            jsxSingleQuote: true,\n            printWidth: 80,\n            proseWrap: 'never',\n            quoteProps: 'preserve',\n            requirePragma: false,\n            semi: true,\n            singleQuote: true,\n            tabWidth: 2,\n            trailingComma: 'all',\n            useTabs: false,\n            vueIndentScriptAndStyle: true,\n        });\n    },\n    babel: (code) => {\n        return prettier_1.default.format(code, {\n            parser: 'babel',\n            plugins: [parser_babel_js_1.default],\n            arrowParens: 'avoid',\n            bracketSameLine: true,\n            bracketSpacing: false,\n            embeddedLanguageFormatting: 'auto',\n            htmlWhitespaceSensitivity: 'ignore',\n            insertPragma: false,\n            jsxSingleQuote: true,\n            printWidth: 80,\n            proseWrap: 'never',\n            quoteProps: 'preserve',\n            requirePragma: false,\n            semi: true,\n            singleQuote: true,\n            tabWidth: 2,\n            trailingComma: 'all',\n            useTabs: false,\n            vueIndentScriptAndStyle: true,\n        });\n    },\n    graphql: (code) => {\n        return prettier_1.default.format(code, {\n            parser: 'graphql',\n            plugins: [parser_html_js_1.default, parser_graphql_js_1.default],\n            arrowParens: 'avoid',\n            bracketSameLine: true,\n            bracketSpacing: false,\n            embeddedLanguageFormatting: 'auto',\n            htmlWhitespaceSensitivity: 'ignore',\n            insertPragma: false,\n            jsxSingleQuote: true,\n            printWidth: 80,\n            proseWrap: 'never',\n            quoteProps: 'preserve',\n            requirePragma: false,\n            semi: true,\n            singleQuote: true,\n            tabWidth: 2,\n            trailingComma: 'all',\n            useTabs: false,\n            vueIndentScriptAndStyle: true,\n        });\n    },\n};\n\n\n//# sourceURL=webpack://generator-gql/./src/utils/format.ts?");

/***/ }),

/***/ "commander":
/*!****************************!*\
  !*** external "commander" ***!
  \****************************/
/***/ ((module) => {

module.exports = require("commander");

/***/ }),

/***/ "ora":
/*!**********************!*\
  !*** external "ora" ***!
  \**********************/
/***/ ((module) => {

module.exports = require("ora");

/***/ }),

/***/ "prettier":
/*!***************************!*\
  !*** external "prettier" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("prettier");

/***/ }),

/***/ "prettier/parser-babel.js":
/*!*******************************************!*\
  !*** external "prettier/parser-babel.js" ***!
  \*******************************************/
/***/ ((module) => {

module.exports = require("prettier/parser-babel.js");

/***/ }),

/***/ "prettier/parser-graphql.js":
/*!*********************************************!*\
  !*** external "prettier/parser-graphql.js" ***!
  \*********************************************/
/***/ ((module) => {

module.exports = require("prettier/parser-graphql.js");

/***/ }),

/***/ "prettier/parser-html.js":
/*!******************************************!*\
  !*** external "prettier/parser-html.js" ***!
  \******************************************/
/***/ ((module) => {

module.exports = require("prettier/parser-html.js");

/***/ }),

/***/ "prettier/parser-typescript.js":
/*!************************************************!*\
  !*** external "prettier/parser-typescript.js" ***!
  \************************************************/
/***/ ((module) => {

module.exports = require("prettier/parser-typescript.js");

/***/ }),

/***/ "tslib":
/*!************************!*\
  !*** external "tslib" ***!
  \************************/
/***/ ((module) => {

module.exports = require("tslib");

/***/ }),

/***/ "vue":
/*!**********************!*\
  !*** external "vue" ***!
  \**********************/
/***/ ((module) => {

module.exports = require("vue");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

module.exports = require("fs");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("path");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./index.ts");
/******/ 	var __webpack_export_target__ = exports;
/******/ 	for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
/******/ 	if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ 	
/******/ })()
;