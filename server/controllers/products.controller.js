import ErrorModel from '../models/Error.model.js'
import Product from '../models/Products.model.js'

const getProducts = async (req, res, next) => {   
    try {
        const products = await Product.find().sort({ updated: -1 })
        if(products) return res.status(200).json(products)
    } catch(err) {
        return next(new ErrorModel(err))
    }
}

export {
    getProducts
}