import Product from "../models/Product.js"

export const addproduct = async (req, res) => {
    try {
        const { productName, brand, price, description, images, type } = req.body
        if (productName && brand && price && description && images && type) {
            const product = new Product({
                productName, brand, price, description, images, type
            })
            await product.save()
            return res.status(201).json({
                msg: "Product created with successfully.",
                success: true,
                data: product
            })
        }
        return res.status(400).json({
            msg: "No data found. Failed to create product.",
            success: false
        })
    } catch (err) {
        res.status(500).json({ msg: err?.message, success: false })
    }
}
export const getproductbyid = async (req, res) => {
    try {
        const { id } = req.params
        const response = await Product.findOne({ _id: id })
        if (response) {
            return res.status(200).json({
                msg: "Product does found.",
                success: true,
                data: response
            })
        }
        return res.status(404).json({
            msg: "Product not found.",
            success: false
        })
    } catch (err) {
        res.status(500).json({ msg: err?.message, success: false })
    }
}

export const getallproducts = async (req, res) => {
    try {
        const resp = await Product.find({})
        console.log(resp);
        res.status(200).json({
            msg: "Data successfully retrieved.",
            success: true,
            data: resp
        })
    } catch (err) {
        res.status(500).json({ msg: err?.message, success: false })
    }
}

export const updateproductbyid = async (req, res) => {
    try {
        const { _id, productName, brand, price, description, images, type } = req.body
        if (_id && productName && brand && price && description && images && type) {
            const updatedProduct = await Product.findOneAndUpdate({ "_id": _id },
                req.body,
                { new: true }
            )
            if (!updatedProduct) {
                return res.status(404).json({
                    msg: "Product not found.",
                    success: false
                })
            }
            return res.status(200).json({
                msg: "Product does modify successfully.",
                success: true,
                data: updatedProduct
            });
        }
        return res.status(400).json({
            msg: "No data found. Failed to update product.",
            success: false
        })
    } catch (err) {
        res.status(500).json({ msg: err?.message, success: false })
    }
}

export const getproductbynameordescription = async (req, res) => {
    try {
        const { key } = req.body
        if (key) {
            const regex = new RegExp(key, "i");
            const resp = await Product.find({
                $or: [
                    { productName: { $regex: regex } },
                    { description: { $regex: regex } }
                ]
            });
            return res.status(200).json({
                success: true,
                data: resp
            })
        }
        return res.status(400).json({
            msg: "No data found. Failed to get prducts.",
            success: false
        })
    } catch (err) {
        res.status(500).json({ msg: err?.message, success: false })
    }
}
