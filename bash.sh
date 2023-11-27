read -p 'commit：' commit
git add .
git commit -m "$commit"
nrm use npm
lerna publish
nrm use taobao