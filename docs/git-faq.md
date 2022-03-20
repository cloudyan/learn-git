# git-faq

## 常见问题

- `git add .` 后想撤销怎么操作？
- `git commit -am 'file msg'` 添加了错误的 commit 信息想修改怎么操作？
- 如何删除远程分支？批量呢？
- 如何拉取一个本地不存在的远程分支？
- 撤销已经 commit 的修改，恢复为暂存区内容？恢复为工作区内容？
- 分支关联远程链接后，如何撤销？
- 查看差异，暂存区和工作区？仓库和工作区？仓库和暂存区？
- 正在开发 feature 分支（有 dev 分支切出来），接着我们有个 dev 的 bug 需要修复，然后我们忘记checkout 到 dev 分支，而是直接在 feature 分支上新建，当我们发现分支建立在错误点的时候我们已经提交了好几个 commit 了，如何修正此问题？
- 提交了好几个 commit 了，才发现中间有个 commit 写的不对，要修正怎么处理？
- 开发的好几个 commit 已经提交到远程了，现在说之前一个 commit 需求不要了，如何处理？
- 有个分支不小心删除了，怎么找回来？
- 使用 reset 删除了某 commit 的工作，现在后悔了，想恢复怎么办？
- 使用 `git reset --hard HEAD^` 删除了最新提交，现在又后悔了，想还原怎么办?
- github 拉取比较慢怎么解决？
- 多个 github、gitlab 等账户并存？
- 在 `.gitignore` 中添加规则无效什么原因？
- HEAD^ 与 HEAD~ 有什么区别?
  - [参考](./git-command)
- 代码回滚：Reset、Checkout 和 Revert 如何选择?
  - https://github.com/geeeeeeeeek/git-recipes/wiki/5.2-代码回滚：Reset、Checkout、Revert-的选择
- 如何找回不小心删除的东西 `git reflog`
- 提交后想在同一个 commit 里再加点东西怎么办
- 如何修改最后一个 commit message `git commit --amend`
- 提交代码到错误分支怎么办
- 修改代码后执行 diff，为啥是空的
- 如何 undo 近 5 个 commit
- 如何 undo 某个文件的改动

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

### 执行 `git commit --date=2019-07-10T12:00:00` 时报错，fatal: could not read '/Users/jack/.stCommitMsg': No such file or directory

```bash
# 查看 commit.template 以及 Users/xxx，是否配置正确
git config --get commit.template
```

### 无权限 push

提示错误

```bash
ssh: connect to host ssh.github.com port 443: Network is down
fatal: Could not read from remote repository.

Please make sure you have the correct access rights
and the repository exists.
```

可能网络问题

### git push 遇到错误

```bash
remote: error: GH007: Your push would publish a private email address.
remote: You can make your email public or disable this protection by visiting:
remote: http://github.com/settings/emails
To github.com:dwdjs/xxx.git
! [remote rejected] dev -> dev (push declined due to email privacy restrictions)
error: failed to push some refs to 'git@github.com:dwdjs/xxx.git'
```

由于设置了邮箱为隐私邮箱，有两种解决方式：

1. 在 github 上 setting -> Emails -> Keep my email addresses private 去掉勾选。
2. 或者命令行中配置邮箱为 username@users.noreply.github.com，操作的配置文件为~/.gitconfig

```bash
git config --global user.email 'username@users.noreply.github.com'

# 查看所有配置
git config --list
```

### git push 遇到错误

```bash
error: RPC failed; curl 92 HTTP/2 stream 0 was not closed cleanly: PROTOCOL_ERROR (err 1)
fatal: the remote end hung up unexpectedly
```

这是因为

1. git 有两种拉代码的方式，一个是 HTTP，另一个是 ssh。git 的 HTTP 底层是通过 curl 的。
2. 使用的http2协议 `HTTP/2` 与 `Proxy-Connection` 响应头头不兼容

解决办法

- git 仓库改用 http1.1
- 或 改用 ssh 拉取代码（推荐）

- https://blog.csdn.net/chenyyhh92/article/details/79421091
- https://blog.csdn.net/qq_42150559/article/details/95354249
- https://juejin.im/entry/5a0d59bf6fb9a0451543702d

参考：

- [与忽略文件 .gitignore 的斗智斗勇](https://blog.csdn.net/qq_32452623/article/details/75264547)
- [Git 原理：15分钟成为 GIT 专家](https://www.jianshu.com/p/c221f99f0bfd)
- [HEAD^ 与 HEAD~ 的区别](https://stackoverflow.com/questions/2221658/whats-the-difference-between-head-and-head-in-git)
- https://github.com/521xueweihan/git-tips
- https://www.cnblogs.com/gerrydeng/p/7170531.html
- https://blog.csdn.net/chenyyhh92/article/details/79421091
