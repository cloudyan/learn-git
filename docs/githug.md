# githug

[githug](https://github.com/Gazler/githug) ，这个命令行工具被设计来练习你的 Git 技能，它把平常可能遇到的一些场景都实例化，变成一个一个的关卡，一共有 56 个关卡，所以将它形象的形容为 Git 游戏。

**安装**

```bash
# Mac
gem install githug

# play
githug

# 帮助
githug hint         # Get a hint for the current level
githug levels       # List all of the levels
githug play         # Initialize the game
githug reset        # Reset the current level
githug test         # Test a level from a file path
```

1. init 初始化仓库

    > A new directory, ‘git_hug’, has been created; initialize an empty repository in it.
    >
    > 把 'git_hug' 这个新建的目录变为一个可以被 Git 管理的仓库。

2. config 设置用户名和电子邮箱地址

    > Set up your git name and email, this is important so that your commits can be identified.
    >
    > 设置你的用户名和电子邮件地址。

3. add 把文件添加到暂存区

    > There is a file in your folder called 'README', you should add it to your staging area.
    >
    > 目录中有一个名为 'README' 的文件，把它添加到暂存区。

4. commit 提交

    > The 'README' file has been added to your staging area, now commit it.
    >
    > 'README' 文件已经添加到暂存区了，现在提交它吧。

5. clone 克隆远程仓库

    > Clone the repository at https://github.com/Gazler/cloneme.
    >
    > 克隆远程仓库 https://github.com/Gazler/cloneme 到本地。

6. clone_to_folder 克隆远程仓库，并指定本地目录名

    > Clone the repository at https://github.com/Gazler/cloneme to 'my_cloned_repo'.
    >
    > 克隆远程仓库 https://github.com/Gazler/cloneme 到本地的 'my_cloned_repo' 目录。

7. ignore 配置不被 Git 管理的文件

    > The text editor 'vim' creates files ending in '.swp' (swap files) for all files that are currently open.  We don't want them creeping into the repository.  Make this repository ignore '.swp' files.
    >
    > 文本编辑器 'vim' 会自动创建以 '.swp' 结尾的临时交换文件，我们不想让这些文件进入到仓库，让仓库忽略掉这些 '.swp' 文件。

8. include 配置不被 Git 管理的文件

    > Notice a few files with the '.a' extension.  We want git to ignore all but the 'lib.a' file.
    >
    > 我们想忽略以 '.a' 为扩展名的文件，但不忽略 'lib.a' 这个文件。

9. status 查看仓库状态

    > There are some files in this repository, one of the files is untracked, which file is it?
    >
    > 仓库中有一个文件是未被 Git 管理的，请问是哪一个文件？

10. number_of_files_committed 查看仓库状态

    > There are some files in this repository, how many of the files will be committed?
    >
    > 仓库中有多少文件即将被提交？

11. rm 删除文件

    > A file has been removed from the working tree, however the file was not removed from the repository.  Find out what this file was and remove it.
    >
    > 有一个文件被从工作目录中直接删除了，而没有通知到仓库，找到这个文件，把它从仓库中删除。

12. rm_cached 从暂存区中移除文件，系 git add 的逆操作

    > A file has accidentally been added to your staging area, find out which file and remove it from the staging area.  \*NOTE\* Do not remove the file from the file system, only from git.
    >
    > 有一个文件不小心被添加到了暂存区，找到它，然后把它从暂存区中删除。\*注意\* 不是要把它从文件系统里删除，只是要从 Git 暂存区删除。

13. stash 保存而不提交

    > You've made some changes and want to work on them later. You should save them, but don't commit them.
    >
    > 你修改了一个文件，但还没改完，这时你要保存它，而不是提交它。

14. rename 文件改名

    > We have a file called 'oldfile.txt'. We want to rename it to 'newfile.txt' and stage this change.
    >
    > 有一个名为 'oldfile.txt' 的文件，要把它改名为 'newfile.txt'，并且把这个改动记录到暂存区。

15. restructure 整理目录结构

    > You added some files to your repository, but now realize that your project needs to be restructured.  Make a new folder named 'src' and using Git move all of the .html files into this folder.
    >
    > 仓库中逐渐积累了一些文件，现在你意识到应该重新组织一下目录结构，请创建一个名为 'src' 的新目录名，用 Git 能追踪到方式把 .html 文件移到此文件夹中。

16. log 查询日志

    > You will be asked for the hash of most recent commit.  You will need to investigate the logs of the repository for this.
    >
    > 你将被询问最近一次提交的 hash 值，可以通过仓库日志找到它。

17. tag 打标签

    > We have a git repo and we want to tag the current commit with 'new_tag'.
    >
    > 为仓库当前的提交增加一个名为 'new_tag' 的标签。

18. push_tags 把标签推送到远程仓库

    > There are tags in the repository that aren't pushed into remote repository. Push them now.
    >
    > 本地仓库里有一些标签没有推送到远程仓库中，把它们推送到远程仓库。

19. commit_amend 修改最后一次提交

    > The 'README' file has been committed, but it looks like the file 'forgotten_file.rb' was missing from the commit.  Add the file and amend your previous commit to include it.
    >
    > 已经提交了文件 'README'，但忘记提交文件 'forgotten_file.rb' 了。修改前一次提交，把这个文件加进去。

20. commit_in_future 指定提交的日期

    > Commit your changes with the future date (e.g. tomorrow).
    >
    > 把提交日期设定在未来的某一天（比如明天）。

21. reset 从暂存区中移除文件，系 git add 的逆操作

    > There are two files to be committed.  The goal was to add each file as a separate commit, however both were added by accident.  Unstage the file 'to_commit_second.rb' using the reset command (don't commit anything).
    >
    > 已经有2个文件即将被提交（即是已加入到暂存区），但为了把每个文件分别提交，需要把 'to_commit_second.rb' 这个文件用 reset 命令从暂存区中移出（不要提交任何文件）。

22. reset_soft 撤销提交，系 git commit 的逆操作

    > You committed too soon. Now you want to undo the last commit, while keeping the index.
    >
    > 你仓促地提交了代码，现在想取消最后一次提交，同时保持暂存区不变。

23. checkout_file 撤销对一个文件的修改

    > A file has been modified, but you don't want to keep the modification.  Checkout the 'config.rb' file from the last commit.
    >
    > 一个文件已被修改过，但你不想保留修改过的内容。从最后一次提交中 checkout 出 'config.rb' 文件。

24. remote 查询远程仓库

    > This project has a remote repository.  Identify it.
    >
    > 这个项目有一个远程仓库，找出它。

25. remote_url 查询远程仓库

    > The remote repositories have a url associated to them.  Please enter the url of remote_location.
    >
    > 这个远程仓库有一个与它相关的 URL，请输入远程仓库 remote_location 的 URL 地址。

26. pull 从远程仓库拉取更新

    > You need to pull changes from your origin repository.
    >
    > 你需要从远程仓库 origin 拉取更新。

27. remote_add 添加远程仓库

    > Add a remote repository called 'origin' with the url https://github.com/githug/githug
    >
    > 添加一个远程仓库，名为 'origin'，url 是 https://github.com/githug/githug

28. push 把提交推送到远程仓库

    > Your local master branch has diverged from the remote origin/master branch. Rebase your commit onto origin/master and push it to remote.
    >
    > 你本地仓库的代码是由远程仓库的 origin/master 分支创建的。rebase 你的更新到 origin/master，然后提交到远程仓库。

29. diff 查看文件被修改的细节

    > There have been modifications to the 'app.rb' file since your last commit. Find out whick line has changed.
    >
    > 最后一次提交之后，你又修改了 'app.rb' 这个文件。找到哪一行被修改过。

30. blame 查询每一行代码被谁编辑过

    > Someone has put a password inside the file 'config.rb' find out who it was.
    >
    > 有人在 'config.rb' 中植入了一个密码，请找出这是谁干的。

31. branch 创建分支

    > You want to work on a piece of code that has the potential to break things, create the branch test_code.
    >
    > 你想要修改一处代码，在修改过程中可能会引起一些问题，所以要创建一个分支 test_code 来修改。

32. checkout 切换分支

    > Create and switch to a new branch called my_branch.  You will need to create a branch like you did in the previous level.
    >
    > 创建并切换到新分支 my_branch。你要像上一关那样先创建一个分支。

33. checkout_tag 切换到标签

    > You need to fix a bug in the version 1.2 of your app. Checkout the tag `v1.2`.
    >
    > 你要在 1.2 版本中修复一个 bug，切换到 tag 'v1.2'。

34. checkout_tag_over_branch 切换到标签

    > You need to fix a bug in the version 1.2 of your app. Checkout the tag `v1.2` (Note: There is also a branch named `v1.2`).
    >
    > 你要在 1.2 版本中修复一个 bug，切换到 tag 'v1.2'（注意：现在有一个分支也叫 'v1.2'）。

35. branch_at 在指定的提交处创建分支

    > You forgot to branch at the previous commit and made a commit on top of it. Create branch test_branch at the commit before the last.
    >
    > 你忘记了在上一个提交之间先创建一个分支就提交了。创建一个分支 test_branch 在最后一次提交之前。

36. delete_branch 删除分支

    > You have created too many branches for your project. There is an old branch in your repo called 'delete_me', you should delete it.
    >
    > 你为这个项目创建了太多的分支。有一个旧分支名为 'delete_me'，删除掉它。

37. push_branch 推送分支到远程仓库

    > You've made some changes to a local branch and want to share it, but aren't yet ready to merge it with the 'master' branch.  Push only 'test_branch' to the remote repository.
    >
    > 你的一个本地分支有一些修改，你想把它分享出去，但又不想合并到 master 分支上。仅把 'test_branch' 推送到远程仓库。

38. merge 合并分支

    > We have a file in the branch 'feature'; Let's merge it to the master branch.
    >
    > 你有一个文件在分支 'feature'，把它合并到 master 分支。

39. fetch 从远程仓库抓取数据

    > Looks like a new branch was pushed into our remote repository. Get the changes without merging them with the local repository
    >
    > 看起来好像有新的分支推送到了远程仓库。得到新的修改而不要合并到本地仓库。

40. rebase 变基合并

    > We are using a git rebase workflow and the feature branch is ready to go into master. Let's rebase the feature branch onto our master branch.
    >
    > 我们使用了 git rebase 工作流，feature 分支准备合并到 master。rebase 这个 feature 分支到我们的 master 分支之上。

41. rebase_onto 合并一段commits

    > You have created your branch from `wrong_branch` and already made some commits, and you realise that you needed to create your branch from `master`. Rebase your commits onto `master` branch so that you don't have `wrong_branch` commits.
    >
    > 优化你的仓库，重新打包，并清除多余的包。

42. repack 重新打包

    > Optimise how your repository is packaged ensuring that redundant packs are removed.
    >
    > 优化你的仓库，重新打包，并清除多余的包。

43. cherry-pick 合并分支上指定的提交

    > Your new feature isn't worth the time and you're going to delete it. But it has one commit that fills in `README` file, and you want this commit to be on the master as well.
    >
    > 你在新功能上的努力白废了，准备删除掉它，但是往 'README' 文件里填充内容的那次提交还有用，你要把这次提交合并到主线上。

44. grep 搜索文本

    > Your project's deadline approaches, you should evaluate how many TODOs are left in your code.
    >
    > 项目的交付时间快到了，你要评估一下代码里还遗留了多少待办事项。

45. rename_commit 修改历史提交的说明

    > Correct the typo in the message of your first (non-root) commit.
    >
    > 在第一次提交时有一个拼写错误，修正它。

46. squash 把多次提交合并成一次提交

    > You have committed several times but would like all those changes to be one commit.
    >
    > 你提交过几次，但是现在想把这些提交合并成一次提交。

47. merge_squash 合并分支时把多次提交合并成一次提交

    > Merge all commits from the long-feature-branch as a single commit.
    >
    > 把名为 long-feature-branch 的分支合并到主干，把分支中的多次提交合并为主干上的一次提交。

48. reorder 调整提交顺序

    > You have committed several times but in the wrong order. Please reorder your commits.
    >
    > 你提交过几次，但是提交的顺序错了，请调整提交顺序。

49. bisect 用二分法定位 bug

    > A bug was introduced somewhere along the way.  You know that running "ruby prog.rb 5" should output 15.  You can also run "make test".  What are the first 7 chars of the hash of the commit that introduced the bug.
    >
    > 在开发过程中引入了一个 bug。已知运行 "ruby prog.rb 5" 应该输入 15，你也可以运行 "make test" 进行测试。你需要确定引入 bug 的那次提交的哈希值的前7位。

50. stage_lines 添加文件的部分行到暂存区

    > You've made changes within a single file that belong to two different features, but neither of the changes are yet staged. Stage only the changes belonging to the first feature.
    >
    > 你修改了一个文件的多处代码，这些代码分属于2个不同的功能，代码还没有提交到暂存区。仅提交第1个功能相关的代码到暂存区。

51. find_old_branch 查看 Git 上的操作历史

    > You have been working on a branch but got distracted by a major issue and forgot the name of it. Switch back to that branch.
    >
    > 你在一个分支上工作时，被分派处理一个重要的问题，可是处理完这个问题之后，你忘了刚才是在哪个分支上工作了。切换回那个分支。

    这种情况确实经常发生，笨办法就是逐个进入各个分支查看日志，再回忆一下刚才的工作情景。而 Git 提供了一个工具，可以用来查看你在 Git 上的历史操作：

52. revert 取消已推送到远程仓库的提交

    > You have committed several times but want to undo the middle commit. All commits have been pushed, so you can't change existing history.
    >
    > 你提交了多次，但想取消中间的某次提交。所有提交的内容都已经推送到服务端了，所以你不能改变已有的历史。

53. restore 恢复被删除的提交

    > You decided to delete your latest commit by running `git reset --hard HEAD^`.  (Not a smart thing to do.)  You then change your mind, and want that commit back.  Restore the deleted commit.
    >
    > 你决定用 `git reset --hard HEAD^` 删除最后一次提交（一个不太明智的决定），然后你又反悔了，想回退到这条命令之前。请恢复被删除的提交。

54. conflict 解决冲突

    > You need to merge mybranch into the current branch (master). But there may be some incorrect changes in mybranch which may cause conflicts. Solve any merge-conflicts you come across and finish the merge.
    >
    > 你要把名为 mybranch 的分支合并到当前分支 master 中，但是可能有些地方的修改会引起冲突。请解决冲突，完成合并。

55. submodule 把第三方库当作子模块

    > You want to include the files from the following repo: `https://github.com/jackmaney/githug-include-me` into a the folder `./githug-include-me`. Do this without cloning the repo or copying the files from the repo into this repo.
    >
    > 你想把 `https://github.com/jackmaney/githug-include-me` 这个仓库的代码引入到自己项目的 `./githug-include-me` 目录，这个方法不需要克隆第三方仓库，也不需要把第三方仓库的文件复制到你的项目中。

56. contribute

    > This is the final level, the goal is to contribute to this repository by making a pull request on GitHub.  Please note that this level is designed to encourage you to add a valid contribution to Githug, not testing your ability to create a pull request.  Contributions that are likely to be accepted are levels, bug fixes and improved documentation.
    >
    > 这是最后一关，目标是让你在 Github 上提交一个 pull request 贡献。设计本关的目的就是鼓励你向 Githug 提交贡献，而不是测试你使用 pull request 的技能。贡献包括新的关卡、修复BUG和改善文档。

    恭喜通关！

参考：

- https://github.com/Gazler/githug
- https://github.com/zhangxiang958/GitHug-solutions
- https://github.com/comehope/githug-walkthrough
- https://www.jianshu.com/p/482b32716bbe
- https://learngitbranching.js.org/?NODEMO=&locale=zh_CN
