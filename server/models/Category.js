import mongoose from "mongoose";
const categorySchema=mongoose.Schema({
    title:{type:String,required:true},
    image:{type:String,required:true},
    subCategory:{type:Object},


   
})

export default mongoose.model('Category',categorySchema)