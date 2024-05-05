import { Schema, model } from 'mongoose'

const ProductSchema = new Schema({
    productName: {
        type: String,
        required: true
    },
    productDescription: {
        type: String,
        required: true
    },
    productPrice: {
        type: Number,
        required: true
    },
    productImage: {
        type: String,
        required: true
    },
    inCart: {
        type: Boolean,
        default: false
    },
})

export default model('Product', ProductSchema)