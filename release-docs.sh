#!/usr/bin/env sh
set -e
read -p "begin Releasing docs - are you sure? (y/n)" -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]
then
  echo "beigin Releasing docs"

  rm -rf docs
 
  npm run docs

  gh-pages-clean

  gh-pages -d docs --add --git /usr/bin/git
fi
