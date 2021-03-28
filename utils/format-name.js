const chalk = require('chalk')
const log = require('./log')

function formatName(name) {
  if (typeof name === 'string') {
    let result = name
    result = result
      .trim()
      .toLowerCase()
      .replace(/(_|\s)/gi, '-')
      .replace(/[`~!@#$%^&*()_|+\=?;:'",.<>\{\}\[\]\\\/]/gi, '')

    const inputedNameFormated = chalk.bgRedBright.black(name)
    const newNameFormated = chalk.bgBlueBright.black(result)

    if (result === '') {
      log.error(`Name ${inputedNameFormated} is not valid`)
      throw new Error()
    }
    if (name !== result) {
      log.warning(
        `Introduced name ${inputedNameFormated} is not valid, it was replaced by the ${newNameFormated}, in the future use format 'a-z0-9'`
      )
    }
    return result
  } else {
    throw new Error('name must be string')
  }
}
module.exports = { formatName }
