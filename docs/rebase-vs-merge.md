# git rebase vs git merge

- 什么时候我应该用 git merge?
- 什么时候我应该使用 rebase?

## rebase黄金定律

**永远不要rebase一个已经分享的分支**（到非remote分支，比如rebase到master,develop,release分支上），也就是说永远不要rebase一个已经在中央库中存在的分支

只能rebase你自己使用的私有分支

## 一个清晰的，有意义的版本变更信息

一个GIT用户的非常重要的技能是他们必须能够维护一个清晰的语义化的暴露给大众的变更历史。为了达到这个目的，他们必须依赖于四个主要的工具：

- git commit --amend
- git merge外加或不外加--no-ff参数
- git rebase,特别是git reabase -i和git rebase -p
- git cherry-pick(实际上这个命令和rebase是紧密绑定在一起的）

参考：

- https://www.cnblogs.com/kidsitcn/p/5339382.html
- https://learngitbranching.js.org/?NODEMO=&locale=zh_CN
