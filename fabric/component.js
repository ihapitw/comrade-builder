const fs = require('fs').promises
const path = require('path')
const { log, createTemplate } = require('../utils')
const { createImports } = require('./imports')

const pugTemplate = async (name) => {
  return createTemplate(
    await fs.readFile(
      path.resolve(__dirname, './templates/component_pug'),
      'utf8'
    ),
    name
  )
}
const scssTemplate = async (name) => {
  return createTemplate(
    await fs.readFile(
      path.resolve(__dirname, 'templates/component_scss'),
      'utf8'
    ),
    name
  )
}
const jsTemplate = async (name) => {
  return createTemplate(
    await fs.readFile(
      path.resolve(__dirname, 'templates/component_js'),
      'utf8'
    ),
    name
  )
}

function createComponent(name, sourcePath) {
  const target = path.resolve(sourcePath, 'components', name)
  fs.access(target)
    .then(() => {
      log.error(`Component ${name} already exists! 🤡`)
    })
    .catch(async (err) => {
      await fs.mkdir(target)
      await fs.mkdir(path.resolve(target, 'images'))

      await Promise.all([
        fs.writeFile(
          path.resolve(target, `${name}.component.pug`),
          await pugTemplate(name)
        ),
        fs.writeFile(
          path.resolve(target, `${name}.component.scss`),
          await scssTemplate(name)
        ),
        fs.writeFile(
          path.resolve(target, `${name}.component.js`),
          await jsTemplate(name)
        )
      ])
      log.message(`Component ${name} created! 🌸`)
      createImports(sourcePath)
    })
}

module.exports = { createComponent }
