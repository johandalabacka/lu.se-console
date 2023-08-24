require('./index')


console.log('This is console.log')
console.info('This is console.info')
console.debug('This is console.debug')
console.error('This is console.error')
console.warn('This is console.warn')


console.log('This is %dnd console.log with subst string %%d', 2)
console.time('console.time with a label')

console.error({ a: 44, bb: "Hej" })
console.warn("warning with object subst %o inside (after %%o is color reset)", "xxx")

// Console.dir isn't affected
console.dir({ a: 3, b: "hello" })

// Table uses console.log. It should only pass thru
console.table([{ a: 33, b: 22 }, { a: 12, b: 44 }])

// Calls console.log with a formatting string "%s: %s"
console.timeLog('console.time with a label', 3, 4, 5)