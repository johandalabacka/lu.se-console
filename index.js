'use strict'

function nowISO9075() {
  const d = new Date()
  const s = new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString()
  return s.substring(0, 10) + ' ' + s.substring(11, 19)
}

const consoleLog = console.log
const consoleError = console.error

function consoleColored(isError, color, level, ...args) {
  const consoleFunc = isError ? consoleError : consoleLog
  const stream = isError ? process.stderr : process.stdout
  stream.write(`\x1b[${color}m${nowISO9075()} [${level}]\x1b[0m `)
  if (args.length === 1 && typeof args[0] === 'string' && args[0].startsWith('┌')) {
    // A table
    stream.write('\n')
  }
  consoleFunc(...args)
}

console.log = (...args) => consoleColored(false, 29, 'log  ', ...args)
console.error = (...args) => consoleColored(true, 31, 'error', ...args)
console.info = (...args) => consoleColored(false, 32, 'info ', ...args)
console.debug = (...args) => consoleColored(false, 33, 'debug', ...args)
console.warn = (...args) => consoleColored(true, 35, 'warn ', ...args)