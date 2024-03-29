# git-config

- https://git-scm.com/docs/git-config.html

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


# 推荐使用 diff3
$ git config --global merge.conflictstyle zdiff3


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

其他配置参考

```conf
[core]
  filemode = false
  editor = /usr/bin/vim
  # autocrlf = input
  excludesfile = ~/.gitignore_global
  # whitespace = cr-at-eol
[init]
  templatedir = ~/.git_template
[commit]
  template = ~/.stCommitMsg
  verbose = true
[difftool "sourcetree"]
  cmd = /usr/local/bin/bcomp \"$LOCAL\" \"$REMOTE\"
  path = -ro
[mergetool "sourcetree"]
  cmd = /usr/local/bin/bcomp \"$LOCAL\" \"$REMOTE\" \"$BASE\" \"$MERGED\"
  trustExitCode = true
[hub]
  protocol = https
[color]
  ui = true
[pull]
  rebase = true
[push]
  default = simple
  autoSetupRemote = true
[filter "lfs"]
  clean = git-lfs clean -- %f
  smudge = git-lfs smudge -- %f
  process = git-lfs filter-process
  required = true

```

### github操作指南

如果需要操作github/gitlab，你可以参考

- [Git 与 github 操作指南](https://github.com/webcoding/useGit)
- [图形化软件TortoiseGit与github网站关联](https://github.com/webcoding/useGit#图形化软件tortoisegit与github网站关联)

添加 ssh key 到站点，之后 `push` 或 `pull` 就不用每次输入账号、密码了。

**备注**

生成ssh key

`ssh-keygen -t rsa -b 4096 -C "your_email@example.com"` （当前目录 ~/.ssh） 然后可以命名默认id_rsa 或者id_rsa_second 把对应的pub放到公共服务器上。

ssh-keygen（基于密匙的安全验证）：需要依靠密钥进行安全验证，必须为自己创建一对密钥，并把公用密钥放在需要访问的服务器上。

- -t 即指定密钥的类型。密钥的类型有两种，一种是RSA，一种是DSA。
- -b 指定密钥长度。对于RSA密钥，最小要求768位，默认是2048位。命令中的4096指的是RSA密钥长度为4096位。DSA密钥必须恰好是1024位(FIPS 186-2 标准的要求)。
- -C 表示要提供一个新注释，用于识别这个密钥。`""`里面不一定非要填邮箱，可以是任何内容，邮箱仅仅是识别用的key。

### git 多账号配置问题

这里说的多账号配置, 指以下两种

1. 对同一个 git 平台, 在同一个 client(PC 电脑) 使用多个账号去访问, 互不影响
    - 比如针对 github.com, 同一台电脑上需要同时两个人的 github 账号都要配置访问
    - 解决方案:
      - ssh 密钥配置(同一平台同一密钥不能两个账号复用, 需要两个密钥, 就需要区分 ~/.ssh/config)
        - 这里做适配, 需要设置 Host 别名用来区分密钥配置
      - 账号配置(邮箱, 用户名), global 配置不能适配, 此配置需要跟着项目走(./.git/config)
2. 针对多个 git 平台, 使用同一个 client(PC 电脑) 使用多个密钥配置连通, 可直接推送代码
    - 比如同一台电脑, 既要访问公司 git 平台, 又要访问 github 平台, 账号不同
    - 解决方案:
      - ssh 密钥配置(最简单的做法是都使用默认的 id_rsa.pub, 同一密钥可以复用, 也可以用 Host 区分不同的密钥配置)
      - 账号配置(邮箱, 用户名), global 配置不能适配, 此配置需要跟着项目走

有时可能需要重置下 `~/.ssh/known_hosts`(原因可能是系统重装, IP 冲突等等), 直接删除即可, 了解更多可以参看

- https://linuxhint.com/known-hosts-file-ssh-linux/
- [SSH known_hosts](https://zdyxry.github.io/2019/12/06/SSH-known-hosts-%E6%98%BE%E7%A4%BA-IP-%E5%9C%B0%E5%9D%80/)
- https://blog.rootshell.be/2010/11/03/bruteforcing-ssh-known_hosts-files/

可参考：https://docs.gitlab.com/ce/ssh/index.html

```conf
# User1 Account Identity
Host <user_1.gitlab.com>
  Hostname gitlab.com
  PreferredAuthentications publickey
  IdentityFile ~/.ssh/<example_ssh_key1>

# User2 Account Identity
Host <user_2.gitlab.com>
  Hostname gitlab.com
  PreferredAuthentications publickey
  IdentityFile ~/.ssh/<example_ssh_key2>
```

现在，要克隆 的存储库user_1，请user_1.gitlab.com在git clone命令中使用：

```bash
git clone git@<user_1.gitlab.com>:gitlab-org/gitlab.git
```

要更新别名为 的先前克隆的存储库origin：

```bash
git remote set-url origin git@<user_1.gitlab.com>:gitlab-org/gitlab.git
```

令不同 Host 实际映射到同一 HostName，但密钥文件不同。Host 前缀可自定义如xxx。配置文件 mac 为 `/etc/ssh/ssh_config` (推荐使用 `~/.ssh/config`)

如果是 Windows，配置为 `C:\Program Files\Git\etc\ssh\ssh_config`

```yaml
# 配置示例
# 该文件用于配置私钥对应的服务器

# 说明
# 该文件的主要作用就是指明各个 git 帐号对应的 User 以及 IdentityFile 的文件位置。
# TIP: 当配置完毕后，需要取消全局的用户名及邮箱配置，需要在各个项目 repo 中应用自己的用户名以及邮箱：
# 1.取消 global
# git config --global --unset user.name
# git config --global --unset user.email

# 2.设置每个项目 repo 的自己的 user.email
#      如果多个 git 平台账号不同, 是无法使用 global 方案解决的, 仅有此法, 可使用 projj 自动处理
# git config user.email "xxx1@qq.com"
# git config user.name "xxx1"
# 如此，各个 git 帐号间就可以“井水不犯河水”了。
# 测试查找该配置文件的位置 `ssh -vT git@github.com` 第二行内容

# 示例如下

# test
# 配置完成，可以使用下面的命令测试
# 测试时替换掉 example.com
#     ssh -T git@example.com
# 测试 github
#     ssh -T git@github.com
# 测试 码云
#     ssh -T git@gitee.com
# 测试 coding
#     ssh -T git@git.coding.net
# 测试 oschina
#     ssh -T git@git.oschina.net
# 测试 bitbucket
#     ssh -T git@bitbucket.org
# 测试 gitlab(可替换gitlab.com为您的 GitLab 实例域)
#     ssh -T git@gitlab.com


# Host *
#   AddKeysToAgent yes
#   UseKeychain yes
#   IdentityFile ~/.ssh/github


# 为便于独立控制，可针对每个平台独立密钥 ~/.ssh/config

# 格式如下
# Default github user(xxx1@qq.com)
# HostName 这个是真实的域名地址
Host github.com
  HostName github.com
  IdentityFile ~/.ssh/github.com_rsa

Host gitlab.xxx.com
  IdentityFile ~/.ssh/gitlab.xxx.com_rsa

Host gitee.com
  IdentityFile ~/.ssh/gitee.com_rsa


# 为便于独立控制，可针对每个平台独立密钥

# # 格式如下
# # Default github user(xxx1@qq.com)
# # HostName 这个是真实的域名地址
# Host github.com
#   HostName github.com
#   IdentityFile ~/.ssh/github.com_rsa

# # second user(xxx2@qq.com)
# # 建一个github别名，新建的帐号使用这个 Host 别名做克隆和更新
# Host github2
#   HostName github.com
#   IdentityFile ~/.ssh/yue_rsa

# # 公司的 gitlab (xxx 改为公司域，按照以下格式，已验证可用)
# # ssh -T git@gitlab.xxx.com 测试是否连通
# Host gitlab.xxx.com
#   IdentityFile ~/.ssh/gitlab.xxx.com_rsa
#   # HostName gitlab.xxx.com # 可选
#   # PreferredAuthentications publickey # 可选

# # ssh -T git@gitee.com
# Host gitee.com
#   IdentityFile ~/.ssh/gitee.com_rsa

# # 还看到有人这样配置 https://github.com/kryptco/kr/issues/276
# Host *
#   IdentityFile ~/.ssh/github.com_rsa
#   IdentityFile ~/.ssh/gitee.xxx.com_rsa
#   IdentityFile ~/.ssh/gitee.com_rsa
#   IdentityFile ~/.ssh/id_rsa

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

以下是我的配置，供参考

```conf
# Default github user(xxx1@qq.com)
# HostName 这个是真实的域名地址
# ssh-keygen -t rsa -b 4096 生成密钥

# 配置文件参数
# Host: Host可以看作是一个你要识别的模式，对识别的模式，进行配置对应的的主机名和ssh文件
# HostName: 要登录主机的主机名
# User: 登录名
# IdentityFile: 指明上面User对应的identityFile路径

# https://docs.gitlab.com/ce/ssh/index.html
# ssh -T git@gitlab.xxx.com 测试是否连通
Host gitlab.xxx.com
  IdentityFile ~/.ssh/gitlab.xxx.com_rsa

# ssh -T git@gitee.com
Host gitee.com
  HostName gitee.com
  IdentityFile ~/.ssh/gitee.com_rsa

# [ssh: connect to host github.com port 22: Operation timed out](https://www.yuque.com/cloudyan/faq/cb20h1)
# 端口 22 链接超时的情况，可以将下面配置改为后面的 443 端口配置
# ssh -T git@github.com
# Host github.com
#   HostName github.com
#   IdentityFile ~/.ssh/github.com_rsa

# Enabling SSH connections over HTTPS
# ssh -T -p 443 git@github.com
Host github.com
  HostName ssh.github.com
  IdentityFile ~/.ssh/github.com_rsa
  Port 443

# ssh -T git@e.coding.net
Host e.coding.net
  IdentityFile ~/.ssh/coding_rsa
```

其规则就是：从上至下读取config的内容，在每个Host下寻找对应的私钥。这里将GitHub SSH仓库地址中的git@github.com替换成新建的Host别名如：github2，那么原地址是：git@github.com:funpeng/Mywork.git，替换后应该是：github2:funpeng/Mywork.git.

这种情况下，需要几点注意

remote pull push的时候有问题，因为要设置邮箱问题了 pull的时候识别的是邮箱，2个github账号，2个邮箱，我们自然不能使用global的user.email了

## 总结

1. `ssh-keygen -t rsa -b 4096` 生成密钥，默认为 `id_rsa`
   1. 将密钥添加到密钥列表 `ssh-add xxx_rsa`，默认名称不用添加(添加后无需配置 `~/.ssh/config`), 这种添加是临时的，重启就没了
2. 使用命令 “ssh -vT git@xxx.com” 查看 ssh_config 文件的位置
   1. mac: `/etc/ssh/ssh_config`
3. 进入 ssh_config 文件，配置各个 git 帐号的 User 以及 IdentityFIle
4. 在各个项目中配置好 user.name 以及 user.email
5. 在各个 git 帐号间尽情穿梭吧~

`ssh-add -l` 查看所有的密钥列表

ssh-add的作用主要将密钥添加到 ssh-agent 的高速缓存中，这样在当前会话中就不需要再次输入密码了。具体的可以参考 [SSH Keys](https://wiki.archlinux.org/index.php/SSH_Keys_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87))

参考：

- https://gist.github.com/yeungeek/596984fd9e53d6c36c0d
- https://www.cnblogs.com/BeginMan/p/3548139.html
- https://gist.github.com/suziewong/4378434
- https://cloud.tencent.com/developer/article/1418214
- https://help.github.com/cn/github/authenticating-to-github/using-ssh-over-the-https-port
