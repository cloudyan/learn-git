# git branch

## 分支管理策略

## worktree

自从 git 2.5 引入 `git worktree` 命令，管理附属于同一仓库的多个工作区。

一个 git 仓库可以支持多个工作区，允许你一次签出多个分支。 通过`git worktree add`，一个新的工作区与仓库相关联，同时还有额外的元数据，以区分该工作区与同一仓库中的其他工作区。 工作区目录树，连同这些元数据，被称为 "工作区"。

> 请注意，您不能在多个目录中同时检出一个分支。

以下常用命令，覆盖 90% 场景

```bash
# 新建工作树-已有分支 (路径可相对/绝对；分支不存在会自动创建)
git worktree add <路径> <分支>
# 新建工作树-新分支
git worktree add -b <新分支> <路径> master

# 只建路径不切换分支(游离 HEAD，适合 CI)
git worktree add -d <路径>

# 查看现有工作树(显示路径、分支、是否干净)
git worktree list
git worktree prune # 有不干净的工作数，可以自动清理

# 移动工作树(两个路径必须在同一文件系统)
git worktree move <旧路径> <新路径>

# 删除工作树(必须干净或加 `--force`)
git worktree remove <路径>

# 其他
git worktree add [-b|-B <新分支>] [-d] [--checkout|--no-checkout] [-f] <路径> [<分支>|<提交>]
git worktree list [--porcelain]            # 脚本友好输出
git worktree lock [--reason <说明>] <路径>  # 防止被自动/手动删除
git worktree unlock <路径>
git worktree move <旧路径> <新路径
git worktree prune [-n] [-v] [--expire <时间>]  # 清理已物理删除的条目
git worktree remove [-f] <路径>

# 示例
git worktree add ../dev_20250908_1 dev_20250908_1 # 已有分支

git checkout master && git pull
git worktree add -b fix_20250908_1 ../fix_20250908_1 master # 新建分支
```

参考：

- https://www.ruanyifeng.com/blog/2012/07/git.html
- https://nvie.com/posts/a-successful-git-branching-model/
