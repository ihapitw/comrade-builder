const fs = require('fs').promises
const path = require('path')
const { log, createTemplate } = require('../utils/')

const pageTemplate = async (name) => {
  return createTemplate(
    await fs.readFile(path.resolve(__dirname, 'templates/page_pug'), 'utf8'),
    name
  )
}

function createPage(name, sourcePath) {
  const target = path.resolve(sourcePath, 'pages', `${name}.pug`)
  fs.access(target)
    .then(() => {
      log.error(`Page ${name} already exists! 🤡`)
    })
    .catch(async () => {
      await fs.writeFile(target, await pageTemplate(name))
      log.message(`Page ${name} created! 🌸`)
      log.warning(`Please re-run webpack for correct work.`)
    })
}

module.exports = { createPage }
