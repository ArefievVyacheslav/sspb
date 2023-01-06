const { PythonShell } = require('python-shell')
const clearStatuses = require('./clearStatuses')
const getShops = require('./getShops')
const path = require('path')

module.exports = async () => {
  const shops = getShops()
  await clearStatuses()
  for (const shop of shops) {
    PythonShell.run(path.join(__dirname, `../../sspp/advcake/${ shop }/START.py`), null, function (err) {
      if (err) throw err
    })
  }
}

