#### install
```bash
# install
npm install generator-gql -g 
or
yarn global add generator-gql
# use
gen-gql -f ./***.graphqls
```


#### dev build

```bash
# build in folder ./lib
yarn run build
```
#### dev npm test 

```bash
# link
npm link #本地link到全局 
gen-gql -f ./***.graphqls #test
# unlink
npm unlink generator-gql -g
```