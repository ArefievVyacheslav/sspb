const { PythonShell } = require('python-shell')
const clearStatuses = require('./clearStatuses')
const path = require('path')

module.exports = async () => {
  await clearStatuses()
  PythonShell.run(path.join(__dirname, `../../sspp/admitad/vipavenue/START.py`), null, function (err) {
    if (err) throw err
    PythonShell.run(path.join(__dirname, `../../sspp/advcake/stockmann/START.py`), null, function (err) {
      if (err) throw err
      PythonShell.run(path.join(__dirname, `../../sspp/advcake/lgcity/START.py`), null, function (err) {
        if (err) throw err
        PythonShell.run(path.join(__dirname, `../../sspp/advcake/brandshop/START.py`), null, function (err) {
          if (err) throw err
        })
      })
    })
  })
}

