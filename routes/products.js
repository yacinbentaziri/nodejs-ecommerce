import express from "express"
import { addproduct, getallproducts, getproductbyid, getproductbynameordescription, updateproductbyid } from "../controllers/productsController.js"

const router = express.Router()

router.post("/addproduct", addproduct)
router.get("/getproductbyid/:id", getproductbyid)
router.get("/getallproducts",getallproducts)
router.put("/updateproductbyid",updateproductbyid)
router.post("/getproductbynameordescription",getproductbynameordescription)

export default router