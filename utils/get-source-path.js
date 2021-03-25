const fs = require('fs').promises
const path = require('path')

module.exports = {
  async getSourcePath() {
    const pwd = process.env.PWD || process.cwd();
    const sourcePath = path.resolve(pwd, 'src')
    try {
      await fs.access(sourcePath)
      const package = require(path.resolve(pwd, 'package.json'))
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
