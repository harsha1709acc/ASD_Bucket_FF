
const {
    getProducts,
    getProduct,
    createProduct,
    replaceProduct,
    updateProduct,
    deleteProduct
} = require('../services/product_service.js')

const { cache, clearCache } = require('../middleware/cache_middleware')

async function getAll(req, res) {
    try {
        const products = await getProducts()

        cache[req.originalUrl] = {
            data: products,
            createdAt: Date.now()
        }

        res.json(products)
    } catch (err) {
        res.status(500).json({ message: 'Server error' })
    }
}

async function getOne(req, res) {
    try {
        const product = await getProduct(req.params.id)

        if (!product) {
            return res.status(404).json({ message: 'Product not found' })
        }

        cache[req.originalUrl] = {
            data: product,
            createdAt: Date.now()
        }

        res.json(product)
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Server error' })
    }
}

async function create(req, res) {
    try {
        const product = await createProduct(req.body)
        clearCache()
        res.status(201).json(product)
    } catch (err) {
        res.status(500).json({ message: 'Server error' })
    }
}

async function replace(req, res) {
    try {
        const product = await replaceProduct(
            req.params.id,
            req.body
        )

        if (!product) {
            return res.status(404).json({ message: 'Product not found' })
        }

        clearCache()
        res.json(product)
    } catch (err) {
        res.status(500).json({ message: 'Server error' })
    }
}

async function update(req, res) {
    try {
        const product = await updateProduct(
            req.params.id,
            req.body
        )

        if (!product) {
            return res.status(404).json({ message: 'Product not found' })
        }

        clearCache()
        res.json(product)
    } catch (err) {
        res.status(500).json({ message: 'Server error' })
    }
}

async function remove(req, res) {
    try {
        const product = await deleteProduct(req.params.id)

        if (!product) {
            return res.status(404).json({ message: 'Product not found' })
        }

        clearCache()
        res.json({ message: 'Product deleted', product })
    } catch (err) {
        res.status(500).json({ message: 'Server error' })
    }
}

module.exports = {
    getAll,
    getOne,
    create,
    replace,
    update,
    remove
}
