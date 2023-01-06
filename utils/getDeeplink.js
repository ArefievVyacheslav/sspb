const axios = require('axios')


module.exports = async (link, pp) => {
  if (pp === 'advcake') {
    try {
      const { data } = await axios.get(`https://cakelink.ru/link?dl=${link.replaceAll(`'`, '')}&pass=heiI0Lb6K0szpYk8`)
      return data.data.url
    } catch (e) {
      console.log(e)
      return false
    }
  }
}
