const { PythonShell } = require('python-shell')
const clearStatuses = require('./clearStatuses')
const getShops = require('./getShops')
const path = require('path')

async function pythonRecursiveParser () {
  const shops = await getShops()
  await clearStatuses()

  for (const shop of shops) {
    await PythonShell.run(path.join(__dirname, `../../sspp/advcake/${ shop }/START.py`), null, function (err) {
      if (err) throw err
    })
  }

  // shops.forEach(shop => {
  //   PythonShell.run(path.join(__dirname, `../../sspp/advcake/${ shop }/START.py`), null, function (err) {
  //     if (err) throw err
  //   })
  // })
}

module.exports = pythonRecursiveParser

