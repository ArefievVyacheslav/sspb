const axios = require('axios')
const Auth = require('./admitadAuth')
let token
(async function () {
  await Auth().then(tokenRes => token = tokenRes)
})()


module.exports = async (link, pp, offerId) => {
  if (pp === 'advcake') {
    try {
      const { data } = await axios.get(`https://cakelink.ru/link?dl=${link.replaceAll(`'`, '')}&pass=heiI0Lb6K0szpYk8`)
      return data.data.url
    } catch (e) {
      console.log(e)
      return link
    }
  }
  if (pp === 'admitad') {
    try {
      const { data } = await axios.get(`https://api.admitad.com/deeplink/2276598/advcampaign/${offerId}/?ulp=${link}`,
        { headers: {'Authorization' : `Bearer ${token}`} })
      return data[0]
    } catch (e) {
      console.log(e)
      return link
    }
  }
}
