const { MongoClient } = require('mongodb')
const client = new MongoClient('mongodb://localhost:27017')


module.exports = async function () {
  await client.connect()
  const db = await client.db('ss')
  const processing = await db.collection('processing')
  return await processing.find({}).toArray()
}
