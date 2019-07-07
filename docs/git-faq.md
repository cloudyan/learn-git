# git-faq

## 常见问题

- `git add .` 后想撤销怎么操作？
- `git commit -am 'file msg'` 添加了错误的 commit 信息想修改怎么操作？
- 如何删除远程分支？批量呢？
- 如何拉取一个本地不存在的远程分支？
- github 拉取比较慢怎么解决？
- 多个 github、gitlab 等账户并存？
- 在 `.gitignore` 中添加规则无效什么原因？
- HEAD^ 与 HEAD~ 有什么区别?
  - [参考](./git-command)
- 代码回滚：Reset、Checkout 和 Revert 如何选择?
  - https://github.com/geeeeeeeeek/git-recipes/wiki/5.2-代码回滚：Reset、Checkout、Revert-的选择

### `git add .` 后想撤销怎么操作？

```bash

```

### `git commit -am 'file msg'` 添加了错误的 commit 信息想修改怎么操作？

```bash

```

### 如何删除远程分支？批量呢？

```bash

```

### 如何拉取一个本地不存在的远程分支到本地？

```bash

```

### github 拉取比较慢怎么解决？

```bash

```

### 多个 github、gitlab 等账户并存？

```bash

```

### 在 `.gitignore` 中添加规则无效什么原因？

```bash

```

### HEAD^ 与 HEAD~ 有什么区别?

[参考](./git-command)

```bash

```

### 代码回滚：Reset、Checkout 和 Revert 如何选择?

https://github.com/geeeeeeeeek/git-recipes/wiki/5.2-代码回滚：Reset、Checkout、Revert-的选择

```bash

```

## 常见报错处理

### 在clone一个项目后做git命令操作时，出现下面错误解决办法：

```bash
fatal: Not a git repository (or any of the parent directories): .git
```

**解决办法：**你得进入你的工作目录下，然后再git status 或者其它命令就没问题了。

### git无法pull仓库报 `fatal: refusing to merge unrelated histories`

说明：这是在 项目A上修改 `./git/config`后，提交到 项目B 上，无法 pull

如果合并了两个不同的开始提交的仓库，在新的 git 会发现这两个仓库可能不是同一个，为了防止开发者上传错误，于是就给下面的提示

```bash
fatal: refusing to merge unrelated histories
```

[解决方法](https://blog.csdn.net/lindexi_gd/article/details/52554159) 如下

```bash
git pull <remote-url> --allow-unrelated-histories
```

### 当项目过大时，git clone时会出现error: RPC failed; HTTP 504 curl 22 The requested URL returned error: 504 Gateway Time-out的问题

- 可以在 `git clone` 时加上 `--depth=1`，但不一定能解决
- 可以加 vpn 代理，加快下载速度结合 `--depth=1` 来解决

### 从主干下拉分支并关联分支

针对远程已经新建了分支， 在本地如何关联远程的分支

```bash
cloudyan@IT0101 /E/git/webtest (master)
$ git fetch origin

// 如果你的命令无效，我在win8中使用1.8.3就上述命令执行无效，
// 可以使用 git checkout -t 本地分支名 远程分支名，如：
// git checkout -t v4 origin/v4  //v3项目中的分支v4，分支名同则可省略，如：git checkout -t origin/gh-pages
// 使用 git branch -r可以查看远程分支

cloudyan@IT0101 /E/git/webtest (master)
$ git checkout dev
Branch dev set up to track remote branch dev from origin.
Switched to a new branch 'dev'

cloudyan@IT0101 /E/git/webtest (testing)
$ git branch --list
* testing
  master
```

参考：

- [与忽略文件 .gitignore 的斗智斗勇](https://blog.csdn.net/qq_32452623/article/details/75264547)
- [Git 原理：15分钟成为 GIT 专家](https://www.jianshu.com/p/c221f99f0bfd)
- [HEAD^ 与 HEAD~ 的区别](https://stackoverflow.com/questions/2221658/whats-the-difference-between-head-and-head-in-git)
- https://github.com/521xueweihan/git-tips
