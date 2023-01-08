module.exports = (oldProducts, newProducts) => {
  const products = []
  oldProducts.forEach(oldProductObj => {
    newProducts.forEach((newProductObj, idxNew) => {
      if (oldProductObj.name === newProductObj.name
        && oldProductObj.color === newProductObj.color
        && oldProductObj.gender === newProductObj.gender) {
        Object.keys(oldProductObj).forEach(key => {
          if (newProductObj[key] && key !== 'id') oldProductObj[key] = newProductObj[key]
        })
        products.push(oldProductObj)
        newProducts.splice(idxNew, 1)
      }
    })
  })
  products.push(...newProducts)
  return products
}

























