# git-workflow

## 工作流

Git 作为一个源码管理系统，不可避免涉及到多人协作。

协作必须有一个规范的工作流程，让大家有效地合作，使得项目井井有条地发展下去。"工作流程"在英语里，叫做"workflow"或者"flow"，原意是水流，比喻项目像水流那样，顺畅、自然地向前流动，不会发生冲击、对撞、甚至漩涡。

所以制定一套规范有效的git工作流来规范我们的分支管理和工作流程是极其必要的，并且越早越好。

![git-flow](./img/git-flow.png)

下面是三种广泛使用的工作流程：

- 最早诞生、并得到广泛采用的一种工作流程，就是 [Git flow](https://nvie.com/posts/a-successful-git-branching-model/)。
  - Git flow的优点是清晰可控，缺点是相对复杂，需要同时维护两个长期分支。大多数工具都将master当作默认分支，可是开发是在develop分支进行的，这导致经常要切换分支，非常烦人。
  - 这个模式是基于"版本发布"的，目标是一段时间以后产出一个新版本。
  - 不适用于网站项目的"持续发布"，代码一有变动就部署一次。此时，master分支和develop分支的差别不大，没必要维护两个长期分支。
- [Github flow](http://scottchacon.com/2011/08/31/github-flow.html)是Git flow的简化版，专门配合"持续发布"。它是 Github.com 使用的工作流程。
  - Github flow 的最大优点就是简单，对于"持续发布"的产品，可以说是最合适的流程，非常适合网站发布。
  - 问题在于它的假设：master分支的更新与产品的发布是一致的。不适于"版本发布"，由于app 审核或发布窗口限制等原因，会导致 master 分支和线上版本存在不一致问题（不利于问题跟踪修复）。
- [Gitlab flow](http://doc.gitlab.com/ee/workflow/gitlab_flow.html)是 Git flow 与 Github flow 的综合。它吸取了两者的优点，既有适应不同开发环境的弹性，又有单一主分支的简单和便利。它是 Gitlab.com 推荐的做法。
  - Gitlab flow 的最大原则叫做"上游优先"（upsteam first），即只存在一个主分支master，它是所有其他分支的"上游"。只有上游分支采纳的代码变化，才能应用到其他分支。
  - 这里分两种情况，适应不同的开发流程。
    - "持续发布"类项目 master -> 环境分支(预发分支、生产分支) 在master分支以外，再建立不同的环境分支，代码的变化，必须由"上游"向"下游"发展。
    - "版本发布"类项目 每一个稳定版本，都建一个版本分支（只有修复 bug 才允许将代码合并到版本分支）

## Git 使用规范流程

[Git 使用规范流程](http://www.ruanyifeng.com/blog/2015/08/git-use-process.html) 团队开发中，遵循一个合理、清晰的Git使用流程，是非常重要的。

否则，每个人都提交一堆杂乱无章的commit，项目很快就会变得难以协调和维护。

参考流程：

- 针对小团队的 H5 发布，直接使用类 github flow 即可
  - 只有一个长期分支——生产分支 master，所有功能开发，bug 修复，都从此分支拉取
- 小程序开发，类似上述 H5
- App 开发，新增 release/versions 分支，对应各版本
- 项目人员很多，则采用 gitlab flow 流程

整体上，团队小，采用简单的形式，快；团队大，采用严谨的形式，稳。

具体操作步骤如下：

1. 新建分支

    首先，每次开发新功能/修复 bug，都应该新建一个单独的分支，详细可以参考[分支管理策略](https://www.ruanyifeng.com/blog/2012/07/git.html)。

    ```bash
    # 获取主干最新代码
    $ git checkout master
    $ git pull

    # 开发新功能 新建 feature/myfeature 分支（基于 dev）
    # 修复bug 新建 hotfix/xxx 分支（基于 master）
    $ git checkout -b hotfix/xxx master
    $ git checkout -b feature/xxx develop
    ```

2. 提交分支commit

    分支修改后，就可以提交commit了。

    ```bash
    # 分支修改后，就可以提交commit了
    $ git add .
    $ git status

    # verbose参数，会列出 diff 的结果
    $ git commit --verbose
    ```

    `git add` 命令的all参数，表示保存所有变化（包括新建、修改和删除）。从Git 2.0开始，all是 `git add` 的默认参数，所以也可以用 `git add .` 代替。

    `git status` 命令，用来查看发生变动的文件。

    `git commit` 命令的verbose参数，会列出 [diff](http://www.ruanyifeng.com/blog/2012/08/how_to_read_diff.html) 的结果。

3. 撰写提交信息

    提交commit时，必须给出完整扼要的提交信息，下面是一个范本。

    ```vim
    第一行是不超过50个字的提要，然后空一行

    * 罗列出改动原因，
    * 主要变动，
    * 以及需要注意的问题

    最后，提供对应的网址（比如Bug ticket）。
    ```

4. 与主干同步

    分支的开发过程中，要经常与主干保持同步。

    ```bash
    # TODO:
    # 分支的开发过程中，要经常与主干保持同步
    $ git fetch origin
    # 或
    $ git rebase origin/master
    ```

5. 合并commit

    这里分两种派别

    - 一为 merge 模式，简单
    - 二为 rebase 模式，干净

    **merge 模式**

    使用 `git merge xxx --no-ff` 保证版本演进的清晰。

    **rebase 模式**

    > 严格遵守：Golden Rule of Rebasing
    > 永远不要在public 分支上使用git rebase！

    分支开发完成后，很可能有一堆commit，但是合并到主干的时候，往往希望只有一个（或最多两三个）commit，这样不仅清晰，也容易管理。

    那么，怎样才能将多个commit合并呢？这就要用到 git rebase 命令。

    ```bash
    $ git rebase -i origin/master

    # rebase命令的i参数表示互动（interactive），这时git会打开一个互动界面，进行下一步操作。
    - pick：正常选中
    - reword：选中，并且修改提交信息；
    - edit：选中，rebase时会暂停，允许你修改这个commit
    - squash：选中，会将当前commit与上一个commit合并
    - fixup：与squash相同，但不会保存当前commit的提交信息
    - exec：执行其他shell命令
    ```

6. 推送到远程仓库

    合并commit后，就可以推送当前分支到远程仓库了。

    ```bash
    $ git push
    # 不要使用 --force
    ```

    使用 `rebase` 以后，分支历史改变了，跟远程分支不一定兼容，有可能要强行推送（即加 --force 参数 参见这里）。

7. 发出Pull Request

    提交到远程仓库以后，就可以发出 Pull Request 到master分支，然后请求别人进行代码review，确认可以合并到master。

    ```bash
    # 提交到远程仓库以后，就可以发出 Pull Request 到发布分支release，
    # 然后请求别人进行代码review，确认可以合并到release
    $ git push
    ```

8. 发布上线，并增加tag标签标记版本。

    ```bash
    git tag v1.x.x
    git push --tags
    ```

## git-flow 备忘清单

我们可以使用 git-flow 进行有效的分支实践

```bash
# mac
$ brew install git-flow-avh
```

- https://danielkummer.github.io/git-flow-cheatsheet/index.zh_CN.html

```bash
    | init
git | feature| -| start   -| name
    | release|  | finish   |
    | hotfix |  | publish  |
                | pull     |
```

因为项目开发一般要加分支保护，所以使用此工具有问题（直接操作了 master 受保护分支，无法 push），所以此工具可以使用于非团队的私人项目开发

- hotfix 基于生产分支创建
- release 基于开发分支创建（以版本号命名，finish 后自动添加 tag）
- feature 基于开发分支创建

团队开发，仍然采用类似此流程，但通过 PR 形式合并入开发分支或生产分支，而且控制上更灵活。

参考：

- [Git 工作流程](http://www.ruanyifeng.com/blog/2015/12/git-workflow.html)
- [git-flow 的工作流程](https://www.git-tower.com/learn/git/ebook/cn/command-line/advanced-topics/git-flow)
- [分布式-Git-分布式工作流程](https://git-scm.com/book/zh/v2/分布式-Git-分布式工作流程)
- [Git分支管理策略](http://www.ruanyifeng.com/blog/2012/07/git.html)
- [高效git工作流](https://juejin.im/post/5b2b76e251882574934c388d)
