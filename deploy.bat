@echo off
REM https://gist.github.com/belohlavek/61dd16c08cd9c57a168408b9ac4121c2
npm run build
git init
git add dist -f
git commit -m 'deploy'
git subtree push --prefix dist origin gh-pages
