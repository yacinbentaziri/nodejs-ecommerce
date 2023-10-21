import express from "express"
import path from "path"
import multer from "multer"
import { verifyAccessToken, verifyUser } from "../utils/verifyToken.js";
const router = express.Router()
const __dirname = path.resolve();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, './images'))
    },
    filename: (req, file, cb) => {
        const id = req.params.id
        cb(null, id + "_" + new Date().toISOString().replace(/:/g, "-") + "_" + file.originalname)
    }
})
const upload = multer({ storage })

router.post("/:id", verifyAccessToken, verifyUser, upload.single("image"), (req, res) => {
    try {
        const { file } = req
        /*resp.send({
            file: file.originalname,
            path: file.path
        })*/
        res.status(200).json({
            msg: "Image uploaded",
            success: true,
            data: file.path.split("\\")[file.path.split("\\").length - 1]
        })
    } catch (err) {
        res.status(500).json({ msg: err?.message, success: false })
    }
})




export default router