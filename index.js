const express = require('express')
const productRoutes = require('./routes/routes.js')

const app = express()

app.use(express.json())
app.use('/products', productRoutes)

if (require.main === module) {
    app.listen(3000, () => {
        console.log('Server running on port 3000')
    })
}

module.exports = app