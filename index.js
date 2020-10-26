'use strict'

const { inspect } = require('util')
const subst = /%[oOdifs]/

function nowISO9075() {
  const d = new Date()
  const s = new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString()
  return s.substring(0, 10) + ' ' + s.substring(11, 19)
}

function argsToString(...args) {
  return args.map(a => typeof a === 'string' ? a : inspect(a)).join(' ')
}

const consoleLog = console.log
const consoleError = console.error

function consoleColored(f, color, ...args) {
  if (args.length === 1 && typeof args[0] === 'string' && args[0].startsWith('┌')) {
    // A table
    f(...args)
    return
  }
  if (args.length >= 2 && subst.test(args[0])) {
    const formatString = args.shift()
    f(`\x1b[${color}m${nowISO9075()} ${formatString}\x1b[0m`, ...args)
    return
  }
  f(`\x1b[${color}m${nowISO9075()} ${argsToString(...args)}\x1b[0m`)
}

console.log = (...args) => consoleColored(consoleLog, 29, ...args)
console.error = (...args) => consoleColored(consoleError, 31, ...args)
console.info = (...args) => consoleColored(consoleLog, 32, ...args)
console.debug = (...args) => consoleColored(consoleLog, 33, ...args)
console.warn = (...args) => consoleColored(consoleError, 35, ...args)