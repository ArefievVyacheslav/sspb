const server = require('express')()
const cors = require('cors')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const fs = require('fs')
const path = require('path')
const getStatus = require('./utils/getStatus')
const getDeeplink = require('./utils/getDeeplink')
const startParsing = require('./utils/startParsing')
const updateProducts = require('./utils/updateProducts')


server.use(bodyParser.json(), cors())


server.post('/login', (req, res) => {
  const token = jwt.sign({ user: 'user name', admin: true }, 'ssp', { expiresIn: '30d' })
  try {
    if (!(req.body.name === 'ss' && req.body.pass === 'ss')) res.status(400).send('Пошёл нахуй')
    res.status(200).send({ accessToken: token })
  } catch (e) {
    res.status(400).send(e)
  }
})
server.get('/proxy', (req, res) => {
  const proxies = fs.readFileSync(path.join(__dirname, './proxies.txt'), 'utf-8')
  res.send(proxies.split('\n').filter(proxy => !!proxy))
})
server.put('/proxy', (req, res) => {
  const proxies = req.body.reduce((acc, proxy) => acc += proxy + '\n', '')
  fs.writeFileSync(path.join(__dirname, './proxies.txt'), proxies)
  res.status(200).send('Прокси успешно записаны!')
})
server.get('/status', async (req, res) => res.status(200).send(await getStatus()))
server.post('/start_parser', async (req, res) => {
  await startParsing(req.body)
  if (req.body.shop) res.status(200).send(`Парсинг магазина ${req.body.shop.toUpperCase()} запущен!`)
  else res.status(200).send(`Парсинг ВСЕХ МАГАЗИНОВ запущен!`)
})
server.post('/deeplink', async (req, res) => {
  res.status(200).send(await getDeeplink(req.body.deeplink.replaceAll('"', ''), req.body.pp, req.body?.offerId))
})
server.post('/update-products', async (req, res) => {
  res.status(200).send(await updateProducts(req.body.shop))
})


server.listen(3005, () => console.log('SERVER ON 3005'))
