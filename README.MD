#### install
```bash
# install
npm install generator-gql -g 
or
yarn global add generator-gql
# use
gen-gql -f ./***.graphqls
```


#### build

```bash
# bin
# build in folder ./lib
yarn run build-lib

# view
# build in folder ./dist
yarn run build-github
```
#### dev 
#### npm test
```bash
# link
npm link #本地link到全局 
gen-gql -f ./***.graphqls #test
# unlink
npm unlink generator-gql -g
```
### dev test
```bash
# 本地代码测试
yarn run dev-test
# 使用打包lib/index.js测试
yarn run lib-test

```