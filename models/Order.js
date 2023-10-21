import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
    products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'product',
            },
            quantity: {
                type: Number,
            },
        },
    ],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author',
    },
    date: {
        type: String
    }
}, { versionKey: false });

const Order = mongoose.model("order", orderSchema)

export default Order