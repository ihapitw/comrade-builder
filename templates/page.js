const fs = require('fs').promises
const path = require('path')
const { message, error, warning } = require('../utils/message')
const pageTemplate = (name) => {
  return `extends ../pug/layout.pug\n\nblock title\n  | ${name}\nblock page-content\n  | Hello there, in ${name} page!`
}

module.exports = function (name, sourcePath) {
  const target = path.resolve(sourcePath, 'pages', `${name}.pug`)
  fs.access(target)
    .then(() => {
      error(`Page ${name} already exists! 🤡`)
    })
    .catch(async () => {
      await fs.writeFile(target, pageTemplate(name))
      message(`Page ${name} created! 🌸`)
      warning(`Please re-run webpack for correct work.`)
    })
}
