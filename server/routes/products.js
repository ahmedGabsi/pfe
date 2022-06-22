import express from "express"
import { getProducts,getProductsByUser,createProduct,updateProduct, deleteProduct , getProductsBySearch, getProductById,getProductsByCategory, getProductsBySubCategory, likePost, getProductsByLike} from "../controllers/products.js"
import auth  from "../middelwares/auth.js"
const router=express.Router()

router.get("/",getProducts)
router.get("/search",getProductsBySearch)
router.get("/user/:id",getProductsByUser)
router.get("/category/:id",getProductsByCategory)
router.get("/subcategory",getProductsBySubCategory)
router.get("/likes",getProductsByLike)
// router.get("/likesDesc",getProductsBySortingLike)
// router.get("/priceDesc",getProductsBySortingPriceDesc)
// router.get("/priceAsc",getProductsBySortingPriceAsc)






router.get("/:id",getProductById)
router.post("/",auth,createProduct)
router.patch("/:id",auth,updateProduct)
router.delete("/:id",auth,deleteProduct)
router.patch("/:id/likeProduct",auth,likePost)
 
export default router