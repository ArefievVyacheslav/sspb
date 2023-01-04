const { PythonShell } = require('python-shell')
const getShops = require('./getShops')
const path = require('path')


let iterableCount = 0

async function pythonRecursiveParser () {
  const shops = await getShops()
  if (iterableCount < shops.length) {
    PythonShell.run(path.join(__dirname, `../../sspp/advcake/${ shops[ iterableCount ] }/START.py`), null, function (err) {
      if (err) throw err
      iterableCount += 1
      pythonRecursiveParser(shops.length)
      console.log(iterableCount)
    })
  }
}

module.exports = pythonRecursiveParser

