const { log, getSourcePath, formatName } = require('./utils/index')
const { createPage, createComponent, createImports } = require('./fabric')

async function createEntity(type, name) {
  try {
    const sourcePath = await getSourcePath()

    if (type === 'page') {
      const formatedName = formatName(name)
      createPage(formatedName, sourcePath)
    }
    if (type === 'component') {
      const formatedName = formatName(name)
      createComponent(formatedName, sourcePath)
    }
    if (type === 'imports') {
      createImports(sourcePath)
    }
  } catch (err) {
    log.error(`Please call 'comrade ${type}' from app root directory 🤡`)
    console.error(err)
  }
}

module.exports = { createEntity }
