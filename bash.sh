read -p 'commit：' commit
git add .
git commit -m "$commit"
npx nrm use npm
npx lerna publish
npx nrm use taobao