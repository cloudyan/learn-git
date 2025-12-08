# Git目录拆分方法

在实际开发中，有时需要将一个Git仓库中的某个目录拆分为独立的仓库。这通常发生在项目重构、模块化拆分或代码库管理优化时。

## 方法一：git subtree（推荐用于需要保持关联的场景）

`git subtree` 是 Git 提供的子树管理功能，适合需要在原仓库和拆分后仓库之间保持关联的场景。

### 拆分目录为新仓库

```bash
# 1. 从原仓库中提取指定目录到新分支
git subtree push --prefix=<要拆分的目录> <新仓库URL或本地路径> <分支名>

# 2. 或者先创建新分支，然后推送
git subtree split --prefix=<要拆分的目录> -b <新分支名>
git push <新仓库URL> <新分支名>:main
```

### 示例
假设要将 `src/components` 目录拆分为独立仓库：

```bash
# 创建拆分分支
git subtree split --prefix=src/components -b components-subtree

# 推送到新仓库
git push https://github.com/user/new-repo.git components-subtree:main
```

### 优点
- 操作简单，适合日常维护
- 保持历史记录
- 可以双向同步

### 缺点
- 需要完整克隆原仓库
- 对于大型项目不经济

## 方法二：git filter-branch（传统方法）

`git filter-branch` 是一个强大的历史重写工具，可以过滤出特定路径的历史。

### 拆分目录为新仓库

```bash
# 1. 克隆原仓库
git clone <原仓库URL> temp-repo
cd temp-repo

# 2. 过滤出指定目录，删除其他所有内容
git filter-branch --prune-empty --subdirectory-filter <要拆分的目录> -- --all

# 3. 添加新远程仓库
git remote set-url origin <新仓库URL>

# 4. 推送
git push -u origin main
```

### 示例
将 `src/components` 目录拆分为独立仓库：

```bash
git clone https://github.com/user/old-repo.git
cd old-repo

# 提取目录并保留其完整历史
git filter-branch --prune-empty --subdirectory-filter src/components -- --all

# 设置新仓库地址
git remote set-url origin https://github.com/user/new-components-repo.git

# 推送到新仓库
git push -u origin main
```

### 优点
- 保留目录的历史记录
- 结果仓库只包含目标目录的内容

### 缺点
- 重写历史，可能影响其他分支
- 对于大型仓库处理速度较慢
- 操作风险较高

## 方法三：git filter-repo（现代推荐方法）

`git filter-repo` 是一个更现代、更安全的历史重写工具，是 `git filter-branch` 的推荐替代方案。

### 安装
```bash
# 使用 pip 安装
pip install git-filter-repo

# 或使用 brew 安装（macOS）
brew install git-filter-repo
```

### 拆分目录为新仓库（最简操作）

从 A 仓库里只保留指定目录，并把它变成全新独立仓库 B 的最简操作：

1. 裸克隆 A（不 checkout 工作区，速度快）
```bash
git clone --bare https://your-git/A.git A_bare
cd A_bare
```

2. 只保留目标目录，其余全部扔掉
```bash
git filter-repo --path <要拆分的目录> --path-rename <要拆分的目录>:/ --force
```

3. （可选）把旧 remote 删掉，换成新仓库 B 的地址
```bash
git remote add origin https://your-git/B.git
git push --mirror origin
```

### 命令解释

- `--path <目录>` - 只让过滤器保留这一条路径，其余文件和提交全部丢弃
- `--path-rename <目录>:/` - 把指定目录提为根目录（即新仓库里再也不带这层文件夹）。如果你想保留这层目录，把这句去掉即可
- `--force` - filter-repo 强制重写当前仓库；裸仓库里用是安全的
- `--mirror` - 推送所有分支、所有 tag、所有 ref，保证历史完整

### 示例：基本用法
将 `src/components` 目录拆分为独立仓库：

```bash
git clone --bare https://github.com/user/old-repo.git old-repo_bare
cd old-repo_bare

# 提取目录并重命名路径（移除父目录）
git filter-repo --path src/components --path-rename src/components:/ --force

# 设置新仓库地址
git remote add origin https://github.com/user/new-components-repo.git

# 推送到新仓库
git push --mirror origin
```

### 更灵活的用法
```bash
# 提取多个路径
git filter-repo --path src/components/ --path docs/components/

# 提取目录但保持目录结构（不去掉父目录）
git filter-repo --path src/components
```

### 只提取特定分支
如果只想提取特定分支而不是所有分支：

```bash
# 场景1：只想提取 A 仓库的 dev 分支
git clone --bare --branch dev --single-branch https://your-git/A.git A_bare
cd A_bare

git filter-repo \
--path apps/abc \
--path-rename apps/abc:/ \
--refs refs/heads/dev          # 只重写这一条分支

git remote add origin https://your-git/B.git
git push origin dev
```

### 提取多分支
如果 A 仓库有多条分支都要提取：

```bash
# 裸克隆全部历史（默认就会拉全部分支）
git clone --bare https://your-git/A.git A_bare
cd A_bare

# 一次性重写所有分支 + tag
git filter-repo \
--path apps/abc \
--path-rename apps/abc:/        # 想保留目录层就去掉这句

# 全部推到 B
git remote add origin https://your-git/B.git
git push --mirror origin          # 所有分支、tag 一次性过去
```

### 验证结果
本地看一眼目录结构：
```bash
git clone <新仓库URL> B_local
cd B_local
ls                # 应该只剩目标目录里的文件
```

### 常见问题

#### "error: git-filter-repo 找不到"
Python≥3.5 直接 pip 装：
```bash
pip install git-filter-repo
```

#### "refusing to overwrite untracked files"
一定用 裸仓库 操作（--bare），不要在有工作区的仓库里跑 filter-repo。

### 优点
- 比 `git filter-branch` 更快
- 更安全，使用 Python 脚本而非 Shell
- 更灵活的过滤选项
- 更清晰的命令语法

### 缺点
- 需要额外安装
- 相对较新，某些环境可能不支持

## 总结

- `git subtree`: 适合需要保持与原仓库关联的场景
- `git filter-branch`: 功能强大但较旧，处理速度慢
- `git filter-repo`: 最现代的解决方案，推荐使用

选择哪种方法取决于具体需求：如果需要保持原仓库和新仓库之间的关系，使用 `git subtree`；如果需要完全独立的仓库且保留历史，推荐使用 `git filter-repo`。
