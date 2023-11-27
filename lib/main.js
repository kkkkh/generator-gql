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

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.getApiStrSingle = exports.typeReg = exports.completeCode = exports.apiAlias = void 0;\nconst vue_1 = __webpack_require__(/*! vue */ \"vue\");\nexports.apiAlias = (0, vue_1.ref)('result');\nexports.completeCode = (0, vue_1.reactive)({\n    fileCode: '',\n    varCode: '',\n});\nexports.typeReg = /extend\\s+type\\s+([a-zA-Z]+)\\s+{([\\s\\S]*?)}/g;\nconst getApiStrSingle = (code, apiType, genType) => {\n    // 进行分组\n    const groupRes = getGroup(code);\n    // 对每一组数据进行处理\n    const apiArr = groupRes.map((item) => {\n        const apiNameStr = getApiNameStr(item);\n        const apiParamsStr = getApiParamsStr(item);\n        const apiParamsRes = getApiParamsRes(item, genType);\n        return getApiTemplate(apiType, apiNameStr, apiParamsStr, apiParamsRes);\n    });\n    return apiArr;\n};\nexports.getApiStrSingle = getApiStrSingle;\nconst getGroup = (str) => {\n    const apiSplitReg = /\\s*[\\n\\r]\\s*/;\n    // 过滤注释 和 换行符\n    const filtergReg = /^#/;\n    return str.split(apiSplitReg).filter((groupItem) => !filtergReg.test(groupItem) && groupItem !== '');\n};\nconst getApiNameStr = (code) => {\n    const paramsReg = /([a-zA-Z]+)\\s*\\(/;\n    const paramsRes = paramsReg.exec(code);\n    if (paramsRes) {\n        return paramsRes[1];\n    }\n    else {\n        console.log(new Error('未找到Api Name'));\n        return '';\n    }\n};\nconst getApiParamsStr = (code) => {\n    const paramsReg = /\\([\\s\\S]+\\)/;\n    const paramsRes = paramsReg.exec(code);\n    const params = {\n        paramsVar: '',\n        paramsValue: '',\n    };\n    if (paramsRes) {\n        params.paramsVar = paramsRes[0].replace(/([a-zA-Z]+:)/g, '$$$1');\n        params.paramsValue = paramsRes[0].replace(/([a-zA-Z]+)(:\\s*)(\\[?[a-zA-Z]+!?\\]?!?)(,?)/g, '$1$2$$$1$4');\n    }\n    return params;\n};\nconst getApiParamsRes = (code, genType) => {\n    const resReg = /\\)\\s*:\\s*([a-zA-Z]+)/;\n    const res = resReg.exec(code);\n    if (res) {\n        return FieldTypeTransform(res[1], genType);\n    }\n    else {\n        return '';\n    }\n};\nconst getApiTemplate = (apiType, name, { paramsVar, paramsValue }, apiParamsRes) => {\n    return {\n        name,\n        value: `${apiType} ${name}${paramsVar}{\r\n        \t${exports.apiAlias.value}:${name}${paramsValue}\r\n            ${apiParamsRes}\r\n\t\t}`,\n    };\n};\nconst FieldTypeTransform = (type, genType, isFirst = 0) => {\n    isFirst++;\n    const typeReg = new RegExp(`type\\\\s*${type}\\\\s*{([\\\\s\\\\S]*?)}`);\n    const res = typeReg.exec(exports.completeCode[genType]);\n    if (res && res[1]) {\n        const resArr = getGroup(res[1]);\n        const typeRes = resArr\n            .map((item) => {\n            return item.replace(/:\\s*\\[?\\s*([a-zA-Z]+!?)\\s*\\]?!?/g, (macth, code) => {\n                return FieldTypeTransform(code, genType, isFirst);\n            });\n        })\n            .join('\\n');\n        return `{\r\n            ${typeRes}\r\n        }`;\n    }\n    else {\n        return isFirst === 1\n            ? `{\r\n\t\t\tcode\r\n\t\t\tmsg\r\n\t\t\tdata\r\n\t\t}`\n            : '';\n    }\n};\n\n\n//# sourceURL=webpack://generator-gql/./src/main.ts?");

/***/ }),

/***/ "vue":
/*!**********************!*\
  !*** external "vue" ***!
  \**********************/
/***/ ((module) => {

module.exports = require("vue");

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
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/main.ts");
/******/ 	var __webpack_export_target__ = exports;
/******/ 	for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
/******/ 	if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ 	
/******/ })()
;