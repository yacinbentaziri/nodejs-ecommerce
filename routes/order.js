import express from "express"
const router = express.Router()
import { addorder, getordersbyid } from "../controllers/orderController.js"
import { verifyAccessToken, verifyUser } from "../utils/verifyToken.js"

router.post("/addorder", addorder)
router.get("/getordersbyid/:id", verifyAccessToken, verifyUser, getordersbyid)


export default router