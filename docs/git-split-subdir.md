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

### 拆分目录为新仓库

```bash
# 1. 克隆原仓库
git clone <原仓库URL> new-repo
cd new-repo

# 2. 使用 filter-repo 提取指定目录
git filter-repo --path <要拆分的目录>/ --path-rename <要拆分的目录>/

# 3. 添加新远程仓库并推送
git remote add origin <新仓库URL>
git push -u origin main
```

### 示例
将 `src/components` 目录拆分为独立仓库：

```bash
git clone https://github.com/user/old-repo.git
cd old-repo

# 提取目录并重命名路径（移除父目录）
git filter-repo --path src/components/ --path-rename src/components/:

# 设置新仓库地址
git remote add origin https://github.com/user/new-components-repo.git

# 推送到新仓库
git push -u origin main
```

### 更灵活的用法
```bash
# 提取多个路径
git filter-repo --path src/components/ --path docs/components/

# 提取目录但保持目录结构
git filter-repo --path src/components/
```

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
