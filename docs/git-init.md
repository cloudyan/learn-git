# Command line instructions

You can also upload existing files from your computer using the instructions below.

## Git global setup

```bash
git config --global user.name "xxx"
git config --global user.email "xxx@xxx.com"
```

## Create a new repository

```bash
git clone git@xxx.com:xxx/xx.git
cd cdn-cli
touch README.md
git add README.md
git commit -m "add README"
git push -u origin master
```

## Push an existing folder

```bash
cd existing_folder
git init
git remote add origin git@xxx.com:xxx/xx.git
git add .
git commit -m "Initial commit"
git push -u origin master

# 推送所有分支
git push -u origin --all
# 推送所有 tags
git push -u origin --tags
```

## Push an existing Git repository

```bash
cd existing_repo
git remote rename origin old-origin
git remote add origin git@xxx.com:xxx.git
git push -u origin --all
git push -u origin --tags
```
