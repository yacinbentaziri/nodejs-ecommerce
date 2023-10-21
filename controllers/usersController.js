import User from "../models/User.js"

export const getuser = async (req, res) => {
    res.send("test")
}

export const updateuser = async (req, res) => {
    try {
        const { username, email, pwd, phone, cin, address } = req.body
        if (username && email && pwd && phone && cin && address) {
            const updateUser = await User.findOneAndUpdate({ "_id": req.params.id },
                req.body,
                { new: true }
            )
            if (!updateUser) {
                return res.status(404).json({
                    msg: "User not found.",
                    success: false
                })
            }
            return res.status(200).json({
                msg: "User does modify successfully.",
                success: true,
                data: updateUser
            });
        }
        return res.status(400).json({
            msg: "No data found. Failed to update account.",
            success: false,
        })
    } catch (err) {
        res.status(500).json({ msg: err?.message, success: false })
    }
}