#!/usr/bin/env sh
rm -rf docs/dist

npx cross-env NODE_ENV=production webpack --config build/webpack.site.js

superman-cdn cdn /vant ./docs/dist/*.js

rm -rf docs/dist/*.js

gh-pages -d docs/dist --add

#!/usr/bin/env sh
set -e
read -p "begin Releasing docs - are you sure? (y/n)" -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]
then
  echo "beigin Releasing docs"

  rm -rf docs/dist
 
  npm run docs

  gh-pages -d docs --add
fi
