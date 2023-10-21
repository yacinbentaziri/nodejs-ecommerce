import Order from "../models/Order.js"

export const addorder = async (req, res) => {
    try {
        const { cart, user } = req.body
        let products = []
        if (cart && user) {
            for (let i = 0; i < cart.length; i++) {
                const order = {
                    "product": cart[i]._id,
                    "quantity": cart[i].qte
                }
                products.push(order)
            }
            const currentDate = new Date();
            const formattedDate = currentDate.toLocaleString();
            const order = new Order({
                products,
                user,
                date: formattedDate
            })
            console.log(order);
            await order.save()
            return res.status(201).json({
                msg: "Order created with successfully.",
                success: true,
                data: order
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

export const getordersbyid = async (req, res) => {
    try {
        const userid = req.params.id
        const resp = await Order.find({ user: userid })
        if (resp) {
            return res.status(200).json({
                msg: "Orders got with successfully",
                success: true,
                data: resp
            })
        }
        return res.status(404).json({
            msg: "You dont have any orders yet",
            success: false
        })
    } catch (err) {
        res.status(500).json({ msg: err?.message, success: false })
    }
}
