#!/usr/bin/env node

const { Command } = require('commander')
const { getSourcePath } = require('./utils/get-source-path')
const { error } = require('./utils/message')
const formatName = require('./utils/format-name')
const createPage = require('./templates/page')
const createComponent = require('./templates/component')
const createComponentsList = require('./utils/create-components-list')
const program = new Command()

function createEntity(type, name) {
  getSourcePath()
    .then((sourcePath) => {
      if (type === 'page') {
        const formatedName = formatName(name)
        createPage(formatedName, sourcePath)
      }
      if (type === 'component') {
        const formatedName = formatName(name)
        createComponent(formatedName, sourcePath)
      }
      if (type === 'imports') {
        createComponentsList(sourcePath)
      }
    })
    .catch((err) => {
      error(`Please call 'comrade ${type}' from app root directory 🤡`)
      console.error(err)
    })
}
program.version(
  require('./package.json').version,
  '-v, --vers',
  'output the current version'
)

program
  .command('page')
  .arguments('<name>')
  .action((name) => {
    createEntity('page', name)
  })
program
  .command('component')
  .arguments('<name>')
  .action((name) => {
    createEntity('component', name)
  })

program.command('imports').action(() => {
  createEntity('imports')
})

program.parse()
