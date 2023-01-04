const { MongoClient } = require('mongodb')
const client = new MongoClient('mongodb://localhost:27017')


module.exports = async () => {
  await client.connect()
  const db = await client.db('ss')
  const clothesCol = await db.collection('clothes')
  const shoesCol = await db.collection('shoes')
  const accessoriesCol = await db.collection('accessories')
  const clothes = (await clothesCol.find({}).toArray()).map(product => product.shop)
  const shoes = (await shoesCol.find({}).toArray()).map(product => product.shop)
  const accessories = (await accessoriesCol.find({}).toArray()).map(product => product.shop)
  return Array.from(new Set([ ...clothes, ...shoes, ...accessories ]))
}
