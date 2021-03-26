const chalk = require('chalk')

const prefix = chalk.bold.magenta('COMRADE')

const message = (string) => {
  console.log(`${prefix} • ${chalk.greenBright(string)}`)
}
const warning = (string) => {
  console.log(`${prefix} • ${chalk.bold.yellow(`Warning! ${string}`)}`)
}
const error = (string) => {
  console.log(`${prefix} • ${chalk.bold.red(`Error! ${string}`)}`)
}

module.exports = {
  message,
  warning,
  error
}
