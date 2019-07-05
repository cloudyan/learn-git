# git-faq

## 常见问题

- git add . 后想撤销怎么操作？
- git commit -am 'file msg' 添加了错误的 commit 信息想修改怎么操作？
- 如何删除远程分支？批量呢？
- 如何拉取一个本地不存在的远程分支到本地？
- github 拉取比较慢怎么解决？
- 多个 github、gitlab 等账户并存？
- 在 `.gitignore` 中添加规则无效什么原因？
- HEAD^ 与 HEAD~ 有什么区别?
  - [参考](./git-command)
- 代码回滚：Reset、Checkout 和 Revert 如何选择?
  - https://github.com/geeeeeeeeek/git-recipes/wiki/5.2-代码回滚：Reset、Checkout、Revert-的选择

## 常见报错处理

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

参考：

- [与忽略文件 .gitignore 的斗智斗勇](https://blog.csdn.net/qq_32452623/article/details/75264547)
- [Git 原理：15分钟成为 GIT 专家](https://www.jianshu.com/p/c221f99f0bfd)
- [HEAD^ 与 HEAD~ 的区别](https://stackoverflow.com/questions/2221658/whats-the-difference-between-head-and-head-in-git)
