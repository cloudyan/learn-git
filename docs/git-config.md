# git-config

## 安装

test

### 客户端

强烈推荐使用命令行操作，可以配合一个图形化界面偶尔做对比代码或查看历史使用

- [**推荐**]命令行 [https://www.git-scm.com/download/](https://www.git-scm.com/download/)
- 图形化界面
  - [GUI Clients](https://www.git-scm.com/downloads/guis/)，推荐以下两款
  - Windows - TortoiseGit [https://download.tortoisegit.org/tgit/](https://download.tortoisegit.org/tgit/)
  - Mac - Sourcetree [https://www.sourcetreeapp.com/](https://www.sourcetreeapp.com/)

## 配置

Git的设置文件为 `~/.gitconfig`，它可以在用户主目录下（全局配置），也可以在项目目录下（项目配置默认）。

```bash
$ code ~/.gitconfig
# 全局配置
$ git config --list
$ git config [--global] user.name 'name'
$ git config [--global] user.email 'email address'
$ git config [--global] alias.st status

# 设置每个项目repo的自己的user.email
$ git config [--local] user.email "xxx1@qq.com"
$ git config user.name 'cloudyan'
# 忽略文件的权限变化
$ git config core.fileMode false


# 取消配置
git config [--global] --unset user.name
git config [--global] --unset user.email

# 配置 http 和 socks 代理（这是解决 github 拉取代码慢的方案之一）

# git clone一个github上的仓库，太慢，经常连接失败
# 但是github官网流畅访问，为什么？
# https://www.zhihu.com/question/27159393

[http]
  postBuffer = 524288000
  proxy = socks5://127.0.0.1:1086
[https]
  postBuffer = 524288000
  proxy = socks5://127.0.0.1:1086
```

### 别名配置

为了操作更为简单便捷，可以配置别名，对应配置文件 `~/.gitconfig`

```conf
[alias]
  co = checkout
  ci = commit
  st = status
  br = branch
  type = cat-file -t
  dump = cat-file -p
  mg = merge --no-ff
  lg = log --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit
```

### github操作指南

如果需要操作github/gitlab，你可以参考

- [Git 与 github 操作指南](https://github.com/webcoding/useGit)
- [图形化软件TortoiseGit与github网站关联](https://github.com/webcoding/useGit#图形化软件tortoisegit与github网站关联)

添加 ssh key 到站点，之后 `push` 或 `pull` 就不用每次输入账号、密码了。

**备注**

生成ssh key

`ssh-keygen -t rsa -b 4096 -C "your_email@example.com"` （当前目录 ~/.ssh） 然后可以命名默认id_rsa 或者id_rsa_second 把对应的pub放到公共服务器上。

### git 多账号配置问题

令不同 Host 实际映射到同一 HostName，但密钥文件不同。Host 前缀可自定义如xxx。配置文件 mac 为 `/etc/ssh/ssh_config` (推荐使用 `~/.ssh/config`)

如果是 Windows，配置为 `C:\Program Files\Git\etc\ssh\ssh_config`

```conf
# 配置示例
# 该文件用于配置私钥对应的服务器

# 说明
# 该文件的主要作用就是指明各个 git 帐号对应的 User 以及 IdentityFile 的文件位置。
# TIP: 当配置完毕后，需要取消全局的用户名及邮箱配置，需要在各个项目 repo 中应用自己的用户名以及邮箱：
# 1.取消 global
# git config --global --unset user.name
# git config --global --unset user.email

# 2.设置每个项目 repo 的自己的 user.email
# git config user.email "xxx1@qq.com"
# git config user.name "xxx1"
# 如此，各个 git 帐号间就可以“井水不犯河水”了。
# 测试查找该配置文件的位置 `ssh -vT git@github.com` 第二行内容

# 示例如下


# test
# 测试github
# ssh -T git@github.com
# 测试oschina
# ssh -T git@git.oschina.net

# Default github user(xxx1@qq.com)
# HostName 这个是真实的域名地址
Host github.com
  HostName github.com
  IdentityFile ~/.ssh/id_rsa
  # User cloudyan
  # Port 22
  # IdentityFile C:\\Users\\Alice\\.ssh\\id_rsa

# second user(xxx2@qq.com)
# 建一个github别名，新建的帐号使用这个别名做克隆和更新
Host github2
  HostName github.com
  # Port 22
  ; User yue
  IdentityFile ~/.ssh/yue_rsa

# 公司的 gitlab
Host gitlab.xxx.com
  HostName gitlab.xxx.com
  ; User xiaohan
  IdentityFile ~/.ssh/xiaohan_rsa

# 配置示例
# Host myhost     # 这里是自定义的host简称，以后连接远程服务器就可以用命令ssh myhost，如 git@github.com [注意下面有缩进]
#   HostName        # 主机名可用ip也可以是域名(如:github.com或者bitbucket.org)
#   User            # 登录用户名(如：xiaohan)
#   IdentityFile    # 证书文件路径（如~/.ssh/xiaohan_rsa)
#   # Port 22       # 服务器open-ssh端口（默认：22，默认时一般不写此行）
#   # IdentityFile  # C:\\Users\\Alice\\.ssh\\id_rsa
#   # PreferredAuthentications 配置登录时用什么权限认证--可设为 publickey,password publickey,keyboard-interactive等

# username@gitlab.xxx.com

# Host github
#   HostName github.com
#   User xiaohan
#   IdentityFile ~/.ssh/xiaohan_rsa

# 说明
# Host          别名
# HostName      这个是真实的域名地址
# User          配置使用用户名
# IdentityFile  这里是id_rsa的地址
```

其规则就是：从上至下读取config的内容，在每个Host下寻找对应的私钥。这里将GitHub SSH仓库地址中的git@github.com替换成新建的Host别名如：github2，那么原地址是：git@github.com:funpeng/Mywork.git，替换后应该是：github2:funpeng/Mywork.git.

这种情况下，需要几点注意

remote pull push的时候有问题，因为要设置邮箱问题了 pull的时候识别的是邮箱，2个github账号，2个邮箱，我们自然不能使用global的user.email了

## 总结

1. 使用命令 “ssh -vT git@xxx.com” 查看 ssh_config 文件的位置
   1. mac: `/etc/ssh/ssh_config`
2. 进入 ssh_config 文件，配置各个 git 帐号的 User 以及 IdentityFIle
3. 在各个项目中配置好 user.name 以及 user.email
4. 在各个 git 帐号间尽情穿梭吧~

`ssh-add -l` 查看所有的密钥列表

ssh-add的作用主要将密钥添加到 ssh-agent 的高速缓存中，这样在当前会话中就不需要再次输入密码了 具体的可以参考 [SSH Keys](https://wiki.archlinux.org/index.php/SSH_Keys_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87))

参考：

- https://gist.github.com/yeungeek/596984fd9e53d6c36c0d
- https://www.cnblogs.com/BeginMan/p/3548139.html
- https://gist.github.com/suziewong/4378434
- https://cloud.tencent.com/developer/article/1418214
- https://help.github.com/cn/github/authenticating-to-github/using-ssh-over-the-https-port
