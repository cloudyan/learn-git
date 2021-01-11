# git rebase vs git merge

- merge
- merge --no-ff
- rebase <basebranch> <topicbranch>
- rebase --onto A B C

注意 rebase 之后，查看 `git status` 和远程分支有很多差异，且无法 pull，此时是要 `git push -f`

建议先读一遍 [Git详解-目录](https://git-scm.com/book/zh/v2/)

- 什么时候我应该用 git merge?
  - fast-forward 时
- 什么时候使用 git merge --no-ff
- 什么时候我应该使用 rebase?
  - rebase 用于使历史记录中的分支路径更清晰，存储库结构是线性的
- 什么时候使用 rebase --onto?

rebase和merge之间的唯一区别是：

- 生成的历史树结构（通常只在查看提交图时才会显着）是不同的（一个将具有分支，另一个将不具有）。
- 合并通常会创建一个额外的提交（例如树中的节点）。
- 合并和rebase将以不同方式处理冲突。 Rebase将一次提交一个提交的冲突，其中merge将同时呈现它们。

## rebase黄金定律

**永远不要rebase一个已经分享的分支**（到非remote分支，比如rebase到master,develop,release分支上），也就是说永远不要rebase一个已经在中央库中存在的分支

只能rebase你自己使用的私有分支

**如果提交存在于你的仓库之外，而别人可能基于这些提交进行开发，那么不要执行rebase。**

### rebase 用法

- https://git-scm.com/docs/git-rebase
- https://git-scm.com/book/zh/v2/Git-%E5%88%86%E6%94%AF-%E5%8F%98%E5%9F%BA

```bash
# 1. 在dev上开发，pull 远程的 dev 时
git pull --rebase origin dev

# 2. 在基于 dev 的分支 dev-1上开发，
# 让 dev 一直保持最新，同时保持 dev-1 的base是最新的 dev 的 HEAD（dev-1开发中时）
# 当 dev-1 最终开发完时，merge 到 dev 上
git checkout dev
git pull --rebase origin dev
git checkout dev-f1
git rebase dev

# 3. 切片
git rebase --onto A B C
```

## 一个清晰的，有意义的版本变更信息

一个GIT用户的非常重要的技能是他们必须能够维护一个清晰的语义化的暴露给大众的变更历史。为了达到这个目的，他们必须依赖于四个主要的工具：

- git commit --amend
- git merge外加或不外加--no-ff参数
- git rebase,特别是git reabase -i和git rebase -p
- git cherry-pick(实际上这个命令和rebase是紧密绑定在一起的）



参考：

- https://www.cnblogs.com/kidsitcn/p/5339382.html
- https://learngitbranching.js.org/?NODEMO=&locale=zh_CN
