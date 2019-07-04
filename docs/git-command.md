# git-command

最常用的命令

```bash
# 初始化
git init

# 检出仓库
git clone <url>
git clone/fetch <[git clone username@host:]/path/to/repository>

# 配置
git config --list
git config [--global] user.name "[name]"
git config [--global] user.email "[email address]"
git config [--global] alias.st status

# 添加和提交
             add                commit
working dir  <=>  Index(Stage)    <=>    HEAD

# 添加到暂存区（临时保存你的改动）
git add .
git add <filename>
# 提交改动到 HEAD，但还没推送到远程（HEAD 指向最后一次提交）
git commit -m 'commit msg'
git commit -am 'file msg'
# 修改刚刚提交的 commit message
git commit --amend

# 推送改动
git push origin <any-branch>
# 将仓库链接到某个远程服务器
git remote add origin <server>

# 分支
# 创建新分支
git branch <new-branch> <commit>
# 切换分支
git checkout <branch>
# 创建新分支并切换过去
git checkout -b <new-branch>
# 查看分支列表 远程分支 全部分支
git branch | cat
git branch -r
git branch -a
# 切换到上一个分支
git checkout -
# TODO: 重置缓存区
git checkout .
# 删除分支
git branch -d hotfix
git branch -D hotfix log test
# gitlab codereview 后，经常删除了远程分支，但本地还存在 remote-tracking
# 如何批量删除跟踪?
# Deleted remote-tracking branch origin/xxx (was 141f40c).
git branch -rd <remote/xxx> # 仅仅删除远程跟踪
git push origin --delete <remote-xxx>

# 更新与合并
# 更新本地仓库至最新改动
git pull
git fetch/pull [url] [remote] [branch]
# 合并其他分支到你的分支（可能出现冲突conflicts，需要手工合并这些冲突）
git merge <branch> [--no-ff]
# 合并改动之前可以预览差异
# git diff <source_branch> <target_branch>

git branch -d hotfix
git branch -D hotfix log test

# gitlab codereview 后，经常删除了远程分支，但本地还存在 remote-tracking
# 如何批量删除跟踪?
# Deleted remote-tracking branch origin/xxx (was 141f40c).
git branch -rd <remote/xxx> # 仅仅删除远程跟踪
git push origin --delete <remote-xxx>

# 标签
git tag
git tag [tag] [commit]
git tag -d <tag>
git push origin :refs/tags/<tag>
git show <tag>
git push --tags
git checkout -b <new-branch> [tag]

# log
git log
# 只看某一个人的提交记录
git log --auth=bob
# 一个压缩后的每一条提交记录只占一行的输出
git log --pretty=online
# 树形结构展示所有分支，包含作者和标签
git log --graph --oneline --decorate --all
# 看看哪些文件改变了
git log --name-status
git log --help

# 替换本地改动
# 此命令会使用 HEAD 中的最新内容替换掉你的工作目录中的文件，
# 已添加到暂存区的改动以及新文件都不会受到影响
git checkout -- <filename>
# 假如你想丢弃你在本地的所有改动与提交，可以到服务器上获取最新的版本历史，并将你本地主分支指向它
git fetch origin
git reset --hard origin/master

# 实用小贴士
# 内建的图形化 git
gitk
# 彩色的 git 输出
git config color.ui true
# 显示历史记录时，每个提交的信息只显示一行
git config format.pretty oneline
# 交互式添加文件到暂存区
git add -i

git status
git diff
git reflog

git checkout <xxx.file>
git reset [--hard] HEAD
git reset <commit>
git revert
# https://github.com/geeeeeeeeek/git-recipes/wiki/5.2-%E4%BB%A3%E7%A0%81%E5%9B%9E%E6%BB%9A%EF%BC%9AReset%E3%80%81Checkout%E3%80%81Revert-%E7%9A%84%E9%80%89%E6%8B%A9

git stash
git stash list
git stash pop
git stash clear

# 缓存区中删除
git rm --cached <filename>
git rm -r --cached .
```

## 关于 `HEAD^` 和 `HEAD~`

首先，Git 提交可以有多个父级，使用 `^` 你可以找到任何提交的父级，而不仅仅是HEAD。你也可以追溯到几代人，使用 `~`。

- HEAD^ 表示当前分支的提交的第一个父级，是 HEAD^1 的缩写
- HEAD~ 意味着主分支的祖父母，在歧义的情况下支持第一个父母
- 这些说明符可以被任意连接，例如，topic~3^2。
- 而HEAD@{2}变量捕获HEAD运动的历史，用于git reflog或git stash list

为了有一个直观的表示，让我们引用[文档](http://schacon.github.io/git/git-rev-parse#_specifying_revisions)的一部分：

> 以下是Jon Loeliger的插图。
> 提交节点B和C都是提交节点A的父节点。父提交从左到右排序。

```code
G   H   I   J
 \ /     \ /
  D   E   F
   \  |  / \
    \ | /   |
     \|/    |
      B     C
       \   /
        \ /
         A

A =      = A^0
B = A^   = A^1     = A~1
C = A^2  = A^2
D = A^^  = A^1^1   = A~2
E = B^2  = A^^2
F = B^3  = A^^3
G = A^^^ = A^1^1^1 = A~3
H = D^2  = B^^2    = A^^^2  = A~2^2
I = F^   = B^3^    = A^^3^
J = F^2  = B^3^2   = A^^3^2
```

参考：

- https://rogerdudler.github.io/git-guide/index.zh.html
