const fs = require('fs').promises
const path = require('path')
const { message, error } = require('../utils/message')
const createComponentsList = require('../utils/create-components-list')

const pugTemplate = (name) => {
  return `mixin ${name}(data)\n  section.${name}`
}
const scssTemplate = (name) => {
  return `.${name} {\n\n}`
}
const jsTemplate = (name) => {
  return `import './${name}.component.scss'`
}

module.exports = function (name, sourcePath) {
  const target = path.resolve(sourcePath, 'components', name)
  fs.access(target)
    .then(() => {
      error(`Component ${name} already exists! 🤡`)
    })
    .catch(async (err) => {
      await fs.mkdir(target)
      await fs.mkdir(path.resolve(target, 'images'))
      await Promise.all([
        fs.writeFile(
          path.resolve(target, `${name}.component.pug`),
          pugTemplate(name)
        ),
        fs.writeFile(
          path.resolve(target, `${name}.component.scss`),
          scssTemplate(name)
        ),
        fs.writeFile(
          path.resolve(target, `${name}.component.js`),
          jsTemplate(name)
        )
      ])
      message(`Component ${name} created! 🌸`)
      createComponentsList(sourcePath)
    })
}
