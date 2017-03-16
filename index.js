#!/usr/bin/env node

const path = require('path')
const fs = require('fs')

let cwd = process.cwd()

if (cwd.match(/node_modules[\/\\]*$/)) {
  cwd = path.join(cwd, '..')
}

if (!fs.existsSync(path.join(cwd, 'node_modules'))) {
  console.error('Invalid dir')
  process.exit(1)
}

// console.log(`cwd:`, cwd)
//   process.exit(0)


const todelete = fs.readdirSync(path.join(cwd, 'node_modules')).reduce((todelete, c) => {
  if (c === '.bin') {
    return todelete
  }
  // console.log(c)
  let last, d = path.join(cwd, '..')
  while (true) {
    // console.log(d)
    // d = path.join(d, '..')
    if (d === last) {
      return todelete
    }
    last = d
    // console.log(path.join(d, 'node_modules', c))
    const toCheck = path.join(d, 'node_modules', c)
    if (fs.existsSync(toCheck)) {
      // console.log(toCheck)
      todelete.push(c)
      return todelete
    }
    d = path.join(d, '..')
  }
  return todelete
}, [])

if (!todelete.length) {
  console.log('Nothing to move');
  process.exit(0);
}


try {
  const dir = path.join(cwd, 'extra_node_modules')
  fs.mkdirSync(dir)
  console.log('Created', dir)
} catch (error) {
  // console.log('already exists?', dir)
}

// console.log(todelete)

todelete.forEach(d => {
  try { fs.mkdirSync(path.join(cwd, 'extra_node_modules')) } catch (error) {}
  const o = path.join(cwd, 'node_modules', d)
  const n = path.join(cwd, 'extra_node_modules', d)
  try {
    fs.renameSync(o, n)
    console.log('Moved', d, ' => ', n)
  } catch (error) {
    console.log('Cannot move', d, ' => ', n, error)
  }
})
