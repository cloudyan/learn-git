/**

发布 release 版本

1. TODO: 检测分支是否干净
2. TODO: 询问分支并切换分支，拉取最新代码
3. 询问版本并确认
4. 升级版本并添加 tag
5. 发布到远程

*/

const execa = require('execa')
const semver = require('semver')
const inquirer = require('inquirer')
const minimist = require('minimist')
console.log(process.argv);
const cliOptions = minimist(process.argv)

console.log(cliOptions);

// if (cliOptions['local-registry']) {
//   inquirer.prompt = () => ({
//     bump: 'minor',
//     yes: true
//   })
// }

return;

const release = async () => {
  // 检测分支是否干净

  // 询问分支并切换分支，拉取最新代码

  // 询问版本并确认 `${process.cwd()}/package.json`
  const curVersion = require('../package.json').version;

  console.log(`Current version: ${curVersion}`)

  const bumps = ['patch', 'minor', 'major', 'prerelease']
  const versions = {}
  bumps.forEach(b => { versions[b] = semver.inc(curVersion, b) })
  const bumpChoices = bumps.map(b => ({ name: `${b} (${versions[b]})`, value: b }))

  const { bump, customVersion } = await inquirer.prompt([
    {
      name: 'bump',
      message: 'Select release type:',
      type: 'list',
      choices: [
        ...bumpChoices,
        { name: 'custom', value: 'custom' }
      ]
    },
    {
      name: 'customVersion',
      message: 'Input version:',
      type: 'input',
      when: answers => answers.bump === 'custom'
    }
  ])

  const version = customVersion || versions[bump]

  const { yes } = await inquirer.prompt([{
    name: 'yes',
    message: `Confirm releasing ${version}?`,
    type: 'confirm'
  }])

  if (yes) {
    try {
      // update tag
      await execa('npm', ['version', version], { stdio: 'inherit' })
      // push remote
      await execa('git', ['push'], { stdio: 'inherit' })
      await execa('git', ['push', 'origin', `refs/tags/v${version}`], { stdio: 'inherit' })
    } catch (e) {

    }
  }

  // const releaseType = semver.diff(curVersion, version)
}

release().catch(err => {
  console.error(err)
  process.exit(1)
})
