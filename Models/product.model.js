import mongoose from 'mongoose';

const ProductSchema = mongoose.Schema(
    {
                name: {
                type: String,
                required: [true, "Please enter product name"]
            },
    
            imageURL: {
                type: String,
                required: [true, "Please enter image url"]
            },
    
            quantity: {
                type: Number,
                required: true,
                default: 0
            },
    
            price: {
                type: Number,
                required: false
            },
           },
        {
            timestamps: true
        }
)

const Product = mongoose.model("Product", ProductSchema)

export default Product