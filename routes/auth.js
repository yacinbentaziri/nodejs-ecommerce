import express from "express"
import { refreshtoken, signin, signup } from "../controllers/authController.js"
import { verifyAccessToken, verifyRefreshToken, verifyUser } from "../utils/verifyToken.js"
const router = express.Router()

router.post("/signup", signup)
router.post("/signin", signin)

router.get("/refreshtoken/:id", refreshtoken)
//router.get("/refreshtoken/:id", verifyRefreshToken, verifyUser, refreshtoken)

router.get("/test/:id", verifyAccessToken, verifyUser, (req, res) => {
    res.status(200).send("test")
})

export default router