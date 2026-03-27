import express from "express"
import {getProducts} from "../controllers/productController.js"
import {verifyToken} from "../middleware/authMiddleware.js"

const router = express.Router()

router.get("/", getProducts)

router.post("/admin/add", verifyToken, (req,res)=>{
    res.json({
        message:"Product created (fake endpoint for bazar.in)"
    })
})

export default router