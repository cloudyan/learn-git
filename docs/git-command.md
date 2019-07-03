# git-command

最长用的命令

```bash
git init
git clone/fetch <url>

git clone <url>
git config --list
git config [--global] user.name "[name]"
git config [--global] user.email "[email address]"
git config [--global] alias.st status

git add .
git add xxx.file
git commit -am 'file msg'
git commit --amend

git branch | cat
git branch -r
git branch <new-branch> <commit>
git checkout -b <new-branch>
git checkout <branch>
git checkout -
git checkout .

git merge <branch> [--no-ff]

git branch -d hotfix
git branch -D hotfix log test

# gitlab codereview 后，经常删除了远程分支，但本地还存在 remote-tracking
# 如何批量删除跟踪?
# Deleted remote-tracking branch origin/xxx (was 141f40c).
git branch -rd <remote/xxx> # 仅仅删除远程跟踪
git push origin --delete <remote-xxx>

git tag
git tag [tag] [commit]
git tag -d <tag>
git push origin :refs/tags/<tag>
git show <tag>
git push --tags
git checkout -b <new-branch> [tag]

git status
git diff
git reflog

git fetch/pull [url] [remote] [branch]
git push

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
