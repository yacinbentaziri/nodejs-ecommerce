import User from "../models/User.js"
import jwt from "jsonwebtoken"

export const signup = async (req, res) => {
    try {
        const { username, email, pwd } = req.body
        if (username && email && pwd) {
            const user = new User({
                username: username,
                email: email,
                pwd: pwd,
            })
            await user.save()
            return res.status(201).json({
                msg: "Account created with successfully.",
                success: true,
                data: user
            })
        }
        return res.status(400).json({
            msg: "No data found. Failed to create account.",
            success: false
        })
    } catch (err) {
        res.status(500).json({ msg: err?.message, success: false })
    }
}

export const signin = async (req, res) => {
    try {
        const { email, pwd } = req.body
        if (email && pwd) {
            const response = await User.findOne({ email: email, pwd: pwd })
            if (response) {
                const access_token = jwt.sign({ id: response._id, isAdmin: false }, process.env.ACCESS_TOKEN, {
                    expiresIn: "1m"
                })
                const refresh_token = jwt.sign({ id: response._id, isAdmin: false }, process.env.REFRESH_TOKEN)
                res.cookie("access_token", access_token, {
                    httpOnly: true,
                    secure: true,
                    domain: ".reactjs-ecommerce-delta.vercel.app",
                    path: "/",
                    sameSite: "Lax"
                })
                res.cookie("refresh_token", refresh_token, {
                    httpOnly: true,
                    secure: true,
                    domain: ".reactjs-ecommerce-delta.vercel.app",
                    path: "/",
                    sameSite: "Lax"
                })
                return res.status(200).json({
                    msg: "User does found.",
                    success: true,
                    data: response
                })
            }
            return res.status(404).json({
                msg: "User not found.",
                success: false
            })
        }
        return res.status(400).json({
            msg: "No data found. Failed to get account.",
            success: false
        })
    } catch (err) {
        res.status(500).json({ msg: err?.message, success: false })
    }
}

export const refreshtoken = async (req, res) => {
    const access_token = jwt.sign({ id: req.user.id, isAdmin: false }, process.env.ACCESS_TOKEN, {
        expiresIn: "1m"
    })
    const refresh_token = jwt.sign({ id: req.user.id, isAdmin: false }, process.env.REFRESH_TOKEN)
    res.cookie("access_token", access_token, {
        httpOnly: true
    })
    res.cookie("refresh_token", refresh_token, {
        httpOnly: true
    })
    return res.status(200).json({
        msg: "Access token and refresh token updated.",
        success: true
    })

}
