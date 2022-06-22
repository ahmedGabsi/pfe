import mongoose from "mongoose"; 
const userSchema=mongoose.Schema({
    firstName:{type:String,required:true},
    lastName:{type:String,required:true}, 
    email:{type:String,required:true},
    password:{type:String,required:true},
    rating:{
        type:[Number]},
            image:{type:Object},
            phone:{type:String,required:true},
            role:{type:String,required:true,default:'user'}


})

export default mongoose.model('User',userSchema)
