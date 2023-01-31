const { MongoClient } = require('mongodb')
const client = new MongoClient('mongodb://localhost:27017')


function getMatrix (oldProducts, newProducts) {
  const products = []
  oldProducts.forEach(oldProductObj => {
    newProducts.forEach((newProductObj, idxNew) => {
      if (oldProductObj.name === newProductObj.name
        && oldProductObj.color === newProductObj.color
        && oldProductObj.gender === newProductObj.gender
        && oldProductObj.oldprice === newProductObj.oldprice) {
        Object.keys(oldProductObj).forEach(key => {
          if (newProductObj[key] && key !== 'id' && key !== 'create') oldProductObj[key] = newProductObj[key]
        })
        products.push(oldProductObj)
        newProducts.splice(idxNew, 1)
      }
    })
  })
  products.push(...newProducts.map(productObj => {
    delete productObj?.categoryT
    delete productObj?.subcategoryT
    return productObj
  }))
  return [ ...new Set(products) ].map(productObj => {
    if (!productObj.create) productObj.create = new Date().toLocaleString()
    productObj.categoryT = productObj.category.toLowerCase()
    productObj.subcategoryT = productObj.category.toLowerCase()
    return productObj
  })
}


module.exports = async shop => {
  await client.connect()
  const db = await client.db('ss')
  const tempProducts = await db.collection('temp_products')
  const newProducts = await tempProducts.findOne({ shop })
  const oldProducts = []
  const clothesProducts = await db.collection('clothes').find({ shop }).toArray()
  const shoesProducts = await db.collection('shoes').find({ shop }).toArray()
  const accessoriesProducts = await db.collection('accessories').find({ shop }).toArray()
  clothesProducts.forEach(product => {
    oldProducts.push(product)
  })
  shoesProducts.forEach(product => {
    oldProducts.push(product)
  })
  accessoriesProducts.forEach(product => {
    oldProducts.push(product)
  })
  const products = getMatrix(oldProducts, newProducts['products'])
  await db.collection('clothes').deleteMany({ shop })
  await db.collection('shoes').deleteMany({ shop })
  await db.collection('accessories').deleteMany({ shop })
  const clothes = products.filter(product => product.category === 'Одежда')
  const shoes = products.filter(product => product.category === 'Обувь')
  const accessories = products.filter(product => product.category === 'Аксессуары')
  if (clothes.length) await db.collection('clothes').insertMany(clothes)
  if (shoes.length) await db.collection('shoes').insertMany(shoes)
  if (accessories.length) await db.collection('accessories').insertMany(accessories)
}
