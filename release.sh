#!/usr/bin/env sh
set -e
echo " begin Release version, please input your releaes verison, as 1.0.0"
read VERSION
read -p "begin Releasing $VERSION - are you sure? (y/n)" -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]
then
  echo "beigin Releasing $VERSION ..."

  git add -A
  git commit -m "[build] $VERSION"
  npm version $VERSION --message "[release] $VERSION"
  git push origin master

  # publish
  npm publish
fi
