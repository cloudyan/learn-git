# git-faq

## 常见问题

- github 拉取比较慢
- git add . 后撤销此操作
- git commit -am 'file msg' 后撤销此操作
- 删除远程分支
- 批量删除当前分支
- 多账号配置问题

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
