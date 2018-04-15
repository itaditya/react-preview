const express = require('express')
const commands = require('probot-commands')

const getCodeSandboxLink = ({owner, repo, branch, folder = ''}) => {
  const link = `https://codesandbox.io/s/github/${owner}/${repo}/tree/${branch}/${folder}`
  return link
}

module.exports = (robot) => {
  const app = robot.route('/')
  app.use(require('express').static('public'))

  commands(robot, 'preview', async (context, command) => {
    const { payload } = context
    if (payload.comment.user.type === 'Bot') {
      return
    }

    const config = await context.config('config.yml', {
      reactPreviewFolder: ''
    })
    
    const repo = payload.repository.name
    const owner = payload.repository.owner.login
    const prNum = payload.issue.number

    const { data: pullRequestResult } = await context.github.pullRequests.get({owner, repo, number: prNum})

    const prBranchName = pullRequestResult.head.ref
    const prRepoName = pullRequestResult.head.repo.name
    const prOwnerName = pullRequestResult.head.repo.owner.login

    const link = getCodeSandboxLink({
      owner: prOwnerName,
      repo: prRepoName,
      branch: prBranchName,
      folder: config.reactPreviewFolder
    })

    context.github.issues.createComment(context.issue({
      body: `preview it [here](${link})`
    }))
  })
}
