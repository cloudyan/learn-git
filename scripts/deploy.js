
/**

发布上线，主要用于 H5

1. 安装依赖 yarn
2. 代码检查 lint
3. 编译项目 build
4. 发布项目 deploy
5. 是否发布 release

*/

const { execSync, spawn } = require('child_process');
const execa = require('execa')
const semver = require('semver')
const inquirer = require('inquirer')
const minimist = require('minimist')

const packageJson = require(`${process.cwd()}/package.json`);
const { version } = packageJson;
const runner = spawn('npm', ['publish']);

runner.on('close', () => {
  execSync(`git tag ${version}`);
  execSync(`git push origin ${version}:${version}`);
  execSync('git push origin master:master');
});


const cliOptions = minimist(process.argv)


const release = async () => {

}

release().catch(err => {
  console.error(err)
  process.exit(1)
})
