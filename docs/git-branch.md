# git branch

## 分支管理策略

## worktree

自从 git 2.5 引入 `git worktree` 命令，管理附属于同一仓库的多个工作区。

一个 git 仓库可以支持多个工作区，允许你一次签出多个分支。 通过`git worktree add`，一个新的工作区与仓库相关联，同时还有额外的元数据，以区分该工作区与同一仓库中的其他工作区。 工作区目录树，连同这些元数据，被称为 "工作区"。

> 请注意，您不能在多个目录中同时检出一个分支。

```bash
# 已有分支
git worktree add <path to branch> <branch name>

# 新分支
git worktree add -b <new branch name> <path to branch> master

# 示例
git worktree add ../bookloan
```

参考：

- https://www.ruanyifeng.com/blog/2012/07/git.html
- https://nvie.com/posts/a-successful-git-branching-model/
