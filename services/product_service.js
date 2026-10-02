
const {
    getAllProducts,
    getProductById,
    writeProducts
} = require('../database/data.js')

async function getProducts() {
    const products = await getAllProducts()
    return products
}

async function getProduct(id) {
    const product = await getProductById(id)
    return product
}

async function createProduct(data) {
    const products = await getAllProducts()

    const newProduct = {
        ...data,
        id: products.reduce((maxId, product) => Math.max(maxId, product.id), 0) + 1
    }

    products.push(newProduct)

    await writeProducts(products)

    return newProduct
}

async function replaceProduct(id, data) {
    const products = await getAllProducts()

    const index = products.findIndex(
        item => item.id === Number(id)
    )

    if (index === -1) {
        return null
    }

    products[index] = {
        ...data,
        id: Number(id)
    }

    await writeProducts(products)

    return products[index]
}

async function updateProduct(id, data) {
    const products = await getAllProducts()

    const index = products.findIndex(
        item => item.id === Number(id)
    )

    if (index === -1) {
        return null
    }

    products[index] = {
        ...products[index],
        ...data,
        id: products[index].id
    }

    await writeProducts(products)

    return products[index]
}

async function deleteProduct(id) {
    const products = await getAllProducts()

    const index = products.findIndex(
        item => item.id === Number(id)
    )

    if (index === -1) {
        return null
    }

    const deleted = products.splice(index, 1)

    await writeProducts(products)

    return deleted[0]
}

module.exports = {
    getProducts,
    getProduct,
    createProduct,
    replaceProduct,
    updateProduct,
    deleteProduct
}
