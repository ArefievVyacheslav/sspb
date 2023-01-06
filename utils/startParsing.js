const startAllParsers = require('./startAllParsers')
const { PythonShell } = require('python-shell')
const path = require('path')


module.exports = params => {
  if (params.all) startAllParsers()
  else PythonShell.run(path.join(__dirname, `../../sspp/advcake/${params.shop}/START.py`), null, function (err) {
    if (err) throw err
  })
}
