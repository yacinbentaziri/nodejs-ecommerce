import express from "express"
const router = express.Router()
import { send, verify } from "../controllers/paymentController.js"
import { verifyAccessToken, verifyUser } from "../utils/verifyToken.js"

//router.post("/send/:id", verifyAccessToken, verifyUser, send)
router.post("/send/:id", send)


//router.post("/verify/:paymentid/:id", verifyAccessToken, verifyUser, verify)
router.post("/verify/:paymentid/:id", verify)


export default router