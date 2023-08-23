const { MongoClient } = require('mongodb');
const client = new MongoClient('mongodb://localhost:27017');

// Функция для обновления товаров
module.exports = async function updateProducts(shop) {
  try {
    await client.connect();
    const db = client.db('ss');

    const clothesCollection = db.collection('clothes');
    const clothesProducts = await clothesCollection.find({ shop }).toArray()

    const shoesCollection = db.collection('shoes');
    const shoesProducts = await shoesCollection.find({ shop }).toArray()

    const accessoriesCollection = db.collection('accessories');
    const accessoriesProducts = await accessoriesCollection.find({ shop }).toArray()

    const tempProductsCollection = db.collection('temp_products');
    const tempProducts = await tempProductsCollection.findOne({ shop });

    const collectionsMap = { 'Одежда': 'clothes', 'Обувь': 'shoes', 'Аксессуары': 'accessories' }

    // Старые товары, которые обновлены
    const freshProductsIds = []
    // 1. Прохожу по всем новым товарам, чтобы обновить старые и добавить те, которых не было
    for (const product of tempProducts.products) {
      const { name, brand, color, gender, oldprice, description } = product
      const query = { name, brand, color, gender, oldprice, description }
      // Чтоб отлавливать категории, которые плохо определились
      console.log(product.category, product.id)
      // если товар есть в базе, собираю id старых товаров & обновляю
      // если нет, добавляю
      const haveProducts = await db.collection(collectionsMap[ product.category ]).findOne(query)
      if (haveProducts) {
        freshProductsIds.push(haveProducts.id)
        delete product.id
        delete product.like
        delete product.create
        await db.collection(collectionsMap[ product.category ]).updateOne(query, { $set: { ...product } })
      } else {
        await db.collection(collectionsMap[ product.category ]).insertOne(product)
        freshProductsIds.push(product.id)
      }
    }
    // 2. Вычищаю те товары, которых нет при новом парсинге
    for (const product of clothesProducts) {
      if (!freshProductsIds.includes(product.id)) await clothesCollection.deleteOne({ id: product.id })
    }
    for (const product of shoesProducts) {
      if (!freshProductsIds.includes(product.id)) await shoesCollection.deleteOne({ id: product.id })
    }
    for (const product of accessoriesProducts) {
      if (!freshProductsIds.includes(product.id)) await accessoriesCollection.deleteOne({ id: product.id })
    }
    console.log('Обновление товаров завершено.');
  } catch (error) {
    console.error('Произошла ошибка:', error);
  } finally {
    await client.close();
  }
}
