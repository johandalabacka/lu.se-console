'use strict'

function nowISO9075() {
  const d = new Date()
  const s = new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString()
  return s.substring(0, 10) + ' ' + s.substring(11, 19)
}

const subst = /%[oOdifs]/

const consoleLog = console.log
const consoleError = console.error

function consoleColored(consoleFunc, color, args) {
  let timeStamp = null
  if (args.length >= 2 && subst.test(args[0])) {
    const formatString = args.shift()
    timeStamp = `\x1b[${color}m${nowISO9075()}\x1b[0m ${formatString}`
  } else {
    timeStamp = `\x1b[${color}m${nowISO9075()}\x1b[0m`
  }
  if (args.length === 1 && typeof args[0] === 'string' && args[0].startsWith('┌')) {
    // A table
    consoleFunc(timeStamp)
    consoleFunc(...args)
    return
  } 
  consoleFunc(...[timeStamp, ...args])
}

console.log = (...args) => consoleColored(consoleLog, 29, args)
console.error = (...args) => consoleColored(consoleError, 31, args)
console.info = (...args) => consoleColored(consoleLog, 32, args)
console.debug = (...args) => consoleColored(consoleLog, 33, args)
console.warn = (...args) => consoleColored(consoleError, 35, args)