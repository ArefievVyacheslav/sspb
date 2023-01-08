const startAllParsers = require('./startAllParsers')
const { PythonShell } = require('python-shell')
const path = require('path')


module.exports = async params => {
  if (params.all) await startAllParsers()
  else PythonShell.run(path.join(__dirname, `../../sspp/advcake/${params.shop}/START.py`), null, function (err) {
    if (err) throw err
  })
}
