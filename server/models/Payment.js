import mongoose from "mongoose";
const PaymentSchema=mongoose.Schema({
    orders:{type:Object,required:true},
    buyer:{type:Object,required:true},
    totalAmount:{type:Number,required:true},
    buyer_id:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},
    delivred:{type:String,default:false}

},{ timestamps: { createdAt: 'created_at' } })
export default mongoose.model('Payment',PaymentSchema)

