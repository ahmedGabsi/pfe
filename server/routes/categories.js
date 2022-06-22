import express from "express"
import { getCategories,createCategory,updateCategory,deleteCategory, getSubCategories} from "../controllers/categories.js"
import auth  from "../middelwares/auth.js"
const router=express.Router()

router.get("/",getCategories)
router.get("/:id",getSubCategories)


router.post("/",createCategory)
router.patch("/:id",updateCategory)
router.delete("/:id",deleteCategory)
 
export default router