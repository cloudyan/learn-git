# 发行版本

将发布流程，发行版本等流程标准化。

## 语义化版本

版本格式: x.y.z(主版本号.次版本号.修订号)，版本号递增规则如下：

1. 主版本号：当你做了任何不兼容的 API修改，用于断代更新或大版本发布
2. 次版本号：当做了向下兼容的功能性新增，用于常规新增需求
3. 修订版本号：当你只做了向下兼容的问题修正，用于修复 bug。
4. 递增位的右侧位需要清零

### 发布

执行 `npm run release` 脚本，发布发行版本

1. TODO: 检测分支是否干净
2. TODO: 询问分支并切换分支，拉取最新代码
3. 询问版本并确认
4. 升级版本并添加 tag
5. 发布到远程

参考：

- [语义化版本](https://semver.org/lang/zh-CN/)
- [前端自动化发布实战总结](https://juejin.im/post/5b23f18b6fb9a00e6433536d)
- [前端开发如何让持续集成/持续部署(CI/CD)跑起来](https://zhuanlan.zhihu.com/p/26701038)
- [Nodejs 线上服务稳定性保障体系](http://f2e.souche.com/blog/nodejs-xian-shang-fu-wu-wen-ding-xing-bao-zhang-ti-xi/)
- [git tag 辅助工具](http://f2e.souche.com/blog/npm-assistor/)
- https://nvie.com/posts/a-successful-git-branching-model/
