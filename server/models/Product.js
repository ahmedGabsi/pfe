import mongoose from "mongoose";
const productSchema=mongoose.Schema({
    creator:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},
    title:{type:String,required:true},
    description:{type:String,required:true},
    image:{type:[Object],required:true},
    price:{type:Number,required:true,min:1},
    discountPercentage:{type:Number,min:0,max:100,default:0},
    city:{type:String,required:true},
    delegation:{type:String,required:true},
    createdAT:{
        default:new Date().getTime(),
        type:Date
    },
    stock:{type:Number,required:true},
    phone:{type:String,required:true},
    rating:{default:[5],
        type:[Number]},
    likes:{
        default:[],
        type:[String]
    },
    category:{type:mongoose.Schema.Types.ObjectId,ref:'Category',required:true},
    subCategory:{type:String,required:true},
    subCategory2:{type:String}
})

export default mongoose.model('Product',productSchema)