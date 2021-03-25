const fs = require('fs').promises
const path = require('path')

module.exports = {
  async getSourcePath() {
    const sourcePath = path.resolve(process.env.PWD, 'src')
    try {
      await fs.access(sourcePath)
      const package = require(path.resolve(process.env.PWD, 'package.json'))
      if (package.name === 'comrade-builder') {
        return sourcePath
      } else {
        throw new Error('App root no comrade builder')
      }
    } catch (err) {
      return err
    }
  }
}
