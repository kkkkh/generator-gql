<template>
    <el-form ref="genElForm" :model="form" :rules="rules" label-width="100px" class="gen-form p-2">
        <el-tabs v-model="active">
            <el-tab-pane label="gql-file" name="0">
                <el-form-item label="upload-file">
                    <el-upload class="upload-demo" drag action="/" :auto-upload="false" :on-change="uploadChange">
                        <el-icon class="el-icon--upload">
                            <upload-filled />
                        </el-icon>
                        <div class="el-upload__text">
                            Drop file here or <em>click to upload</em>
                        </div>
                        <template #tip>
                            <div class="el-upload__tip">
                                .graphqls files
                            </div>
                        </template>
                    </el-upload>
                </el-form-item>
                <el-form-item label="apiAlias" prop="fileApiAlias">
                    <el-select v-model="fileApiAlias" placeholder="请选择apiAlias" clearable>
                        <el-option v-for="item in apiAliasOptions" :key="item.value" :label="item.label"
                            :value="item.value" />
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button @click="genFileCodeValue">gen file</el-button>
                </el-form-item>
                <el-form-item label="file-code" prop="fileCode">
                    <el-input type="textarea" :rows="20" v-model="form.fileCode" placeholder="生成结果" clearable />
                </el-form-item>
            </el-tab-pane>
            <el-tab-pane label="gql-api" name="1">
                <el-form-item label="content" prop="varCode">
                    <el-input type="textarea" :rows="6" v-model="form.varCode" :placeholder="apiPlaceholder" clearable />
                </el-form-item>
                <el-form-item label="apiAlias" prop="varApiAlias">
                    <el-select v-model="varApiAlias" placeholder="请选择apiAlias" clearable>
                        <el-option v-for="item in apiAliasOptions" :key="item.value" :label="item.label"
                            :value="item.value" />
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button @click="genVarCodeValue">gen api</el-button>
                </el-form-item>
                <el-form-item prop="varCodeValue">
                    <el-input type="textarea" :rows="6" v-model="form.varCodeValue" placeholder="生成结果" clearable />
                </el-form-item>
            </el-tab-pane>
            <el-tab-pane label="gql-type" name="2">
                <el-form-item label="content" prop="fieldCode">
                    <el-input type="textarea" :rows="6" v-model="form.fieldCode" :placeholder="typePlaceholder"
                        clearable />
                </el-form-item>
                <el-form-item>
                    <el-button @click="genFieldCodeValue">gen type</el-button>
                </el-form-item>
                <el-form-item prop="fieldCodeValue">
                    <el-input type="textarea" :rows="6" v-model="form.fieldCodeValue" placeholder="生成结果" clearable />
                </el-form-item>
            </el-tab-pane>
        </el-tabs>
    </el-form>
</template>


<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { UploadFilled } from '@element-plus/icons-vue'
import { genTemplateStr } from "../string/index"

const fileApiAlias = ref('result')
const varApiAlias = ref('result')
const active = ref("0")
const genElForm = ref()
const contentStr = ref("")
const apiPlaceholder = `extend type Query {
    listDevSchTasks(appId: ID!, branchId: ID!, keyword: String, offset: Int!,limit: Int!): ListDevSchTasksResult
}`
const typePlaceholder = `type ListDevSchTasksResult {
    code: Int
    msg: String
    data: ListDevSchTasksDataResult
}`
const form = reactive({
    "fileCode": '',
    "varCode": '',
    "varCodeValue": "",
    "fieldCode": '',
    "fieldCodeValue": "",
})
const uploadChange = (uploadFile: any) => {
    const file = uploadFile.raw as Blob
    var reader = new FileReader();
    reader.onload = ((event) => {
        if (event.type === "load") {
            // console.log(reader.result)
            contentStr.value = reader.result as string
        }
    });
    reader.readAsText(file)
}

const rules = {
    'varCode': [
        { 'required': true, 'message': '请输入var-code', 'trigger': 'blur' },
    ],
    'fieldCode': [
        { 'required': true, 'message': '请输入field-code', 'trigger': 'blur' },
    ],
}
const apiAliasOptions = [{ "label": "result", "value": "result" }]

const genVarCodeValue = () => {
    genElForm.value.validateField('varCode', (isValid: string) => {
        if (isValid) {
            form.varCodeValue = genTemplateStr(form.varCode, "varCode", varApiAlias.value)
        }
    })
}

const genFieldCodeValue = () => {
    genElForm.value.validateField('fieldCode', (isValid: string) => {
        if (isValid) {
            const code = form.fieldCode;
            form.fieldCodeValue = getFildStr(code)
        }
    })
}

const getFildStr = (code: string): string => {
    const fieldReg = /:\s*[a-zA-Z]+!?/g
    const contentReg = /({[\s\S]+})/
    const conttentRes = contentReg.exec(code.replace(fieldReg, ""))
    return conttentRes ? conttentRes[1] : ""
}

const genFileCodeValue = () => {
    // arrayBuffer测试
    // fetch("/src/views/graphql/111.graphqls").then((res) => res.arrayBuffer()).then((response) => {
    //     const enc = new TextDecoder("utf-8")
    //     form.fileCode = genTemplateStr(enc.decode(new Uint16Array(response)), "fileCode")
    // })
    // blob测试
    // fetch("/src/views/graphql/111.graphqls").then((res) => res.blob()).then((response) => {
    //     response.text().then((res) => {
    //         form.fileCode = genTemplateStr(res, "fileCode")
    //     })
    // })
    form.fileCode = genTemplateStr(contentStr.value, 'varCode', fileApiAlias.value)
}
</script>
