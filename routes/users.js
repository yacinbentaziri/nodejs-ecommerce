import express from "express"
import { getuser, updateuser } from "../controllers/usersController.js"
import { verifyAccessToken, verifyUser } from "../utils/verifyToken.js"
const router = express.Router()

router.get("/", getuser)
//router.put("/updateuser/:id", verifyAccessToken, verifyUser, updateuser)
router.put("/updateuser/:id", updateuser)

export default router