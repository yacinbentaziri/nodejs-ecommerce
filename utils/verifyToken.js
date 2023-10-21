import jwt from "jsonwebtoken"

export const verifyAccessToken = (req, res, next) => {
    try {
        const { access_token } = req.cookies
        console.log(req.cookies);

        if (access_token) {
            jwt.verify(access_token, process.env.ACCESS_TOKEN, (err, user) => {
                console.log(err);
                if (err) {
                    return res.status(403).json({
                        msg: err?.message,
                        success: false
                    })
                }
                req.user = user
                next()
            })
        } else {
            return res.status(400).json({
                msg: "No cookie found.",
                success: false
            })
        }
    } catch (err) {
        res.status(500).json({ msg: err?.message, success: false })
    }
}

export const verifyRefreshToken = (req, res, next) => {
    try {
        const { refresh_token } = req.cookies
        if (refresh_token) {
            jwt.verify(refresh_token, process.env.REFRESH_TOKEN, (err, user) => {
                console.log(err);
                if (err) {
                    return res.status(403).json({
                        msg: err?.message,
                        success: false
                    })
                }
                req.user = user
                next()
            })
        } else {
            return res.status(400).json({
                msg: "No cookie found.",
                success: false
            })
        }
    } catch (err) {
        res.status(500).json({ msg: err?.message, success: false })
    }
}


export const verifyUser = (req, res, next) => {
    try {
        if (req.user.id == req.params.id || req.user.isAdmin) {
            next()
        } else {
            return res.status(403).json({ msg: "You are not authorized.", success: false })
        }
    } catch (err) {
        res.status(500).json({ msg: err?.message, success: false })
    }
}

export const verifyAdmin = (req, res, next) => {
    try {
        if (req.user.isAdmin) {
            next()
        } else {
            return res.status(403).json({ msg: "You are not authorized.", success: false })
        }
    } catch (err) {
        res.status(500).json({ msg: err?.message, success: false })
    }
}
