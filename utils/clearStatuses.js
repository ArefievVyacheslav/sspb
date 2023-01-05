const { MongoClient } = require('mongodb')
const client = new MongoClient('mongodb://localhost:27017')


module.exports = async () => {
  await client.connect()
  const db = await client.db('ss')
  const processingCol = await db.collection('processing')
  await processingCol.deleteMany({})
  await client.close()
}
