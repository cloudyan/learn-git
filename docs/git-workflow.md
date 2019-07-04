# git-workflow

## 工作流

工作流英文名称叫做“workflow”，高效的工作流能像流水一样让这个工作体验顺畅且自然。

所以制定一套规范有效的git工作流来规范我们的分支管理和工作流程是极其必要的，并且越早越好。

我们的工作流，请使用下面的规范流程

![my-gitflow](./img/my-gitflow.png)

### Git 使用规范流程

[Git 使用规范流程](http://www.ruanyifeng.com/blog/2015/08/git-use-process.html) 团队开发中，遵循一个合理、清晰的Git使用流程，是非常重要的。

1. 新建分支

    ```bash
    # 每次开发新功能，都应该新建一个单独的分支，可参考[Git分支管理策略]()
    $ git checkout master
    $ git pull
    $ git checkout -b myfeature
    ```

2. 提交分支commit

    ```bash
    # 分支修改后，就可以提交commit了
    $ git add .
    $ git status

    # verbose参数，会列出 diff 的结果
    $ git commit --verbose
    ```

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

    ```bash
    # 以下操作方式待定
    # 分支的开发过程中，要经常与主干保持同步
    $ git fetch origin
    # 或
    $ git rebase origin/master
    ```

5. 合并commit

    ```bash
    # 以下操作待定!!! 合并暂定为 git merge --no-ff
    # 分支开发完成后，很可能有一堆commit，但是合并到主干的时候，往往希望只有一个（或最多两三个）commit，这样不仅清晰，也容易管理。
    # 那么，怎样才能将多个commit合并呢？这就要用到 git rebase 命令。

    $ git rebase -i origin/master

    # i参数表示互动（interactive），这时git会打开一个互动界面，进行下一步操作。
    - pick：正常选中
    - reword：选中，并且修改提交信息；
    - edit：选中，rebase时会暂停，允许你修改这个commit
    - squash：选中，会将当前commit与上一个commit合并
    - fixup：与squash相同，但不会保存当前commit的提交信息
    - exec：执行其他shell命令
    ```

6. 推送到远程仓库

    ```bash
    # 合并commit后，就可以推送当前分支到远程仓库了
    $ git push
    # 不要使用 --force
    $ git push --force origin
    ```

7. 发出Pull Request

    ```bash
    # 提交到远程仓库以后，就可以发出 Pull Request 到发布分支release，
    # 然后请求别人进行代码review，确认可以合并到release
    $ git push
    ```

8. 至少两人code review，之后完成合并
9. 新增tag标签，发布上线

    ```bash
    git tag v1.x.x
    git push --tags
    ```

### git-flow 备忘清单

可以使用 git-flow 进行有效的分支实践

- https://danielkummer.github.io/git-flow-cheatsheet/index.zh_CN.html

```bash
    | init
git | feature| -| start   -| name
    | release|  | finish   |
    | hotfix |  | publish  |
                | pull     |
```

参考：

- [Git 工作流程](http://www.ruanyifeng.com/blog/2015/12/git-workflow.html)
- [分布式-Git-分布式工作流程](https://git-scm.com/book/zh/v2/分布式-Git-分布式工作流程)
- [Git分支管理策略](http://www.ruanyifeng.com/blog/2012/07/git.html)
- [高效git工作流](https://juejin.im/post/5b2b76e251882574934c388d)
