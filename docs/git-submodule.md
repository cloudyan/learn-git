# Git Submodule

> 工欲善其事，必先利其器！

- 为主项目添加 Submodules
  - 添加远程项目为子项目
    - `git submodule add [-b <branch>] <repository> [<path>]`
  - 添加已经存在的本地项目为子项目 ?
- 如何更新子项目
  - `git submodule update`
- 删除
  - `git submodule deinit <submodule-name>`

使用 git 子项目库，常用操作

```bash
# 为主项目添加Submodules
git submodule add <source> <target>



# 拉取初始化

git clone xxx/focus
git submodule init && git submodule update
# 等同
git clone xxx/focus --recursive

# 批量更新三方库
git submodule foreach git checkout master
git submodule foreach git submodule update
```
