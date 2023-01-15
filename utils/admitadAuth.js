const https = require('https')

let config = {
  client_id: '4ezCvadDknPNW5xQvQwduzrjbDiAyq',
  client_secret: '6J0wiTwZOdX9E74i5ufTE2le0ecwA1',
  base64_header: 'NGV6Q3ZhZERrblBOVzV4UXZRd2R1enJqYkRpQXlxOjZKMHdpVHdaT2RYOUU3NGk1dWZURTJsZTBlY3dBMQ=='
}
const options = {
  method: 'POST',
  hostname: 'api.admitad.com',
  path:
    '/token/?grant_type=client_credentials&client_id=' +
    config.client_id +
    '&scope=deeplink_generator',
  headers: {
    Authorization:
      'Basic ' +
      new Buffer.from(config.client_id + ':' + config.client_secret).toString('base64'),
  },
}
module.exports = function getToken() {
  return new Promise(resolve => {
    const request = https.request(options, (response) => {
      response.setEncoding('utf8')
      response.on('data', function (tokenObj) {
        const objResJSON = JSON.parse(tokenObj)
        config.access_token = objResJSON.access_token
        config.refresh_token = objResJSON.refresh_token
        config.expires_in = objResJSON.expires_in
        resolve(config.access_token)
      })
    })
    request.write('')
    request.end()
  })
}
