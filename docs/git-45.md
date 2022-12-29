# 45 个 Git 经典操作场景

- [45 个 Git 经典操作场景，专治不会合代码](https://mp.weixin.qq.com/s/2p4m63JdsCjBpVku-WaZyA)

1. 我刚提交了什么?
2. 我的提交信息（commit message）写错了
3. 我提交（commit）里的用户名和邮箱不对
4. 我想从一个提交(commit)里移除一个文件
5. 我想删除我的的最后一次提交(commit)
6. 删除任意提交(commit)
7. 我尝试推一个修正后的提交(amended commit)到远程，但是报错：
8. 我意外的做了一次硬重置(`git reset --hard`)，我想找回我的内容
9. 暂存(Staging)
   1. 我需要把暂存的内容添加到上一次的提交(commit)
   2. 我想要暂存一个新文件的一部分，而不是这个文件的全部
   3. 我想把在一个文件里的变化(changes)加到两个提交(commit)里
   4. 我想把暂存的内容变成未暂存，把未暂存的内容暂存起来
10. 未暂存(Unstaged)的内容
    1. 我想把未暂存的内容移动到一个新分支
    2. 我想把未暂存的内容移动到另一个已存在的分支
    3. 我想丢弃本地未提交的变化(uncommitted changes)
    4. 我想丢弃某些未暂存的内容
11. 分支(Branches)
    1. 我从错误的分支拉取了内容，或把内容拉取到了错误的分支
    2. 我想扔掉本地的提交(commit)，以便我的分支与远程的保持一致
    3. 我需要提交到一个新分支，但错误的提交到了main
    4. 我想保留来自另外一个ref-ish的整个文件
    5. 我把几个提交(commit)提交到了同一个分支，而这些提交应该分布在不同的分支里
    6. 我想删除上游(upstream)分支被删除了的本地分支
    7. 我不小心删除了我的分支
    8. 我想删除一个分支
    9. 我想从别人正在工作的远程分支签出(checkout)一个分支
12. Rebasing 和合并(Merging)
    1. 我想撤销rebase/merge
    2. 我已经rebase过, 但是我不想强推(force push)
    3. 我需要组合(combine)几个提交(commit)
    4. 检查是否分支上的所有提交(commit)都合并(merge)过了
    5. 交互式rebase(interactive rebase)可能出现的问题
13. Stash
    1. 暂存所有改动
    2. 暂存指定文件
    3. 暂存时记录消息
    4. 使用某个指定暂存
    5. 暂存时保留未暂存的内容
14. 杂项(Miscellaneous Objects)
    1. 克隆所有子模块
    2. 删除标签(tag)
    3. 恢复已删除标签(tag)
    4. 已删除补丁(patch)
15. 跟踪文件(Tracking Files)
    1. 我只想改变一个文件名字的大小写，而不修改内容
    2. 我想从Git删除一个文件，但保留该文件
16. 配置(Configuration)
    1. 我想给一些Git命令添加别名(alias)
    2. 我想缓存一个仓库(repository)的用户名和密码
    3. 我不知道我做错了些什么


```bash
git show
git log -n1 -p

git commit --amend --only
git commit --amend --only -m 'new commit message'

git commit --amend --author "new UserName <newemail@qq.com>"
# 如果需要修改所有历史，参考 `git filter-branch`

git checkout HEAD^ myfile
git add -A
git commit --amend

git reset HEAD^ --hard
git push -f [remote] [branch]

git reset --soft HEAD@{1}

git revert SHAofBadCommit

git rebase --onto SHA1_OF_BAD_COMMIT^ SHA1_OF_BAD_COMMIT
git push -f [remote] [branch]

git push origin mybranch -f

git reset --hard
git reflog

git reset --hard SHA1234


git commit --amend
git add --patch filename.x
git add -N filename.x
-p
-s
-e
git diff --cached
git add -p
git stash
git reset HEAD^
git stash pop --index 0

git checkout -b newBranch

git reset --hard HEAD^
git reset --hard HEAD^^
git reset --hard HEAD~4
git checkout -f

git reset filename

git checkout -p
git reset --hard
git stash -p
git stash drop

git reflog
git reset --hard commitHash

git status
git reset --hard origin/my-branch
git branch my-branch
git reset --hard HEAD^

git reset --hard commitHash
git checkout my-branch

git add -A && git commit -m 'xxxx'

(develop) git checkout solution -- file1.txt

git log

git checkout -b 21
git cherry-pick e3851e8

git checkout main

git fetch -p

git push origin --delete my-branch
git push origin :my-branch
git branch -D my-branch

git fetch --all
git checkout --track origin/daves

git reset --hard ORIG_HEAD

git merge --ff-only my-branch

git reset --soft main
git rebase -i main
git rebase -i HEAD~2

git merge --no-ff --no-commit my-branch

git merge --squash my-branch

git rebase -i @{u}

git log --graph --left-right --cherry-pick --oneline HEAD...feature/120-on-scroll
git log main ^feature/120-on-scroll --no-merges

git mergetool -t opendiff
git rebase --continue
git rebase --abort

git stash -u
git stash push working-directory-path/filename.ext
git stash push working-directory-path/filename1.ext working-directory-path/filename2.ext

git stash save <message>
git stash push -m <message>
git stash list
git stash apply "stash@{n}"
git stash apply "stash@{2.hours.ago}"

git stash create
git stash store -m "commit-message" CREATED_SHA1

git clone --recursive git://github.com/foo/bar.git

git submodule update --init --recursive

git tag -d <tag_name>

git fsck --unreachable | grep tag

git update-ref refs/tags/<tag_name> <hash>

git mv --force myfile MyFile
git rm --cached log.txt


git config --global credential.helper cache

git config --global credential.helper 'cache --timeout=3600'

git reset --hard 0254ea7
```
