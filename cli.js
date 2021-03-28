#!/usr/bin/env node

const { Command } = require('commander')
const { createEntity } = require('./create-entity')

const program = new Command()

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
