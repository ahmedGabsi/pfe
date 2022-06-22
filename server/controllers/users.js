import User from '../models/User.js'  
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const signUp=async(req,res)=>{

    const {password,confirmPassword,firstName,lastName,email,phone}=req.body
    
    try{
        let user = await User.findOne({ email });
    if (user) return res.json({message:"User already registered."});

    if(password !==confirmPassword) return res.json({message:'passwords do not the same'})
    const hash = await bcrypt.hash(password, 10);
      const newUser=new User({
        firstName,
        lastName,
        email,
        phone,
        password:hash
    })
       await newUser.save()
       const token = jwt.sign({ email: newUser.email, firstName:newUser.firstName ,lastName:newUser.lastName, id: newUser._id,phone:newUser.phone }, 'USER_TOKEN_SECRET', { expiresIn: "1h" });

    res.status(200).json({loggedUser:{email: newUser.email, firstName:newUser.firstName ,lastName:newUser.lastName, id: newUser._id ,phone:newUser.phone},
    token})
}
catch({message}){
    res.status(404).json({message})
    console.log("error")
}


}

export const signIn=async(req,res)=>{
    const {password,email}=req.body

  

    try{
    const user= await User.findOne({email})
   
    if(!user) return res.json({message:"Email n'esxite pas !"})
    const verifPassword=await bcrypt.compare(password,user.password)
    if(verifPassword ===false) return res.json({message:"les informations d'identification invalides!"})
    const token = jwt.sign({ email: user.email, firstName:user.firstName ,lastName:user.lastName, id: user._id,phone:user.phone ,role:user.role||"user" }, 'USER_TOKEN_SECRET', { expiresIn: "1h" });

    res.status(200).json({loggedUser:{ email: user.email, firstName:user.firstName ,lastName:user.lastName, id: user._id,phone:user.phone ,role:user.role||"user",image:user.image},
    token})
    }
    catch(err){
    console.log(err)
    }

}


export const updateUser=async(req,res)=>{

  const {id}=req.params;

    try{
    const user= await User.findOne({email:req.body.email})
    let hash;
    let userUpdated;
    if(!user) return res.json({message:"Email n'esxite pas !"})
    const verifPassword=await bcrypt.compare(req.body.actualPassword,user.password)
    if(verifPassword ===false) return res.json({message:"les informations d'identification invalides"})
    if(req.body.password){
     hash = await bcrypt.hash(req.body.password, 10);
     userUpdated = await User.findByIdAndUpdate(id, {...req.body,password:hash}, {
      new: true
    });
    }
    userUpdated = await User.findByIdAndUpdate(id, req.body, {
      new: true
    });    
    
    const token = jwt.sign({ email: userUpdated.email, firstName:userUpdated.firstName ,lastName:userUpdated.lastName, id: userUpdated._id,phone:userUpdated.phone,role:user.role||"user" }, 'USER_TOKEN_SECRET', { expiresIn: "1h" });

    res.status(200).json({loggedUser:{ email: userUpdated.email, firstName:userUpdated.firstName ,lastName:userUpdated.lastName, id: userUpdated._id,image: userUpdated?.image,phone:userUpdated.phone,role:user.role||"user",image:user.image},
    token})
    }
    catch(err){
    console.log(err)
    }

}




export const getUser = async (req, res) => {
  const {id} =req.params

  try {
  
    const users =await User.findById(id).sort({_id: -1})
    res.status(200).json(users);
  } catch ({ message }) {
    res.status(401).json({ message });
  }
};
export const getUsers = async (req, res) => {

  try {
   
    const users =await User.find().sort({_id: -1});
    res.status(200).json(users);
  } catch ({ message }) {
    res.status(401).json({ message });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
   
    const users =await User.findByIdAndDelete(id);
    res.status(200).json(users);
  } catch ({ message }) {
    res.status(401).json({ message });
  }
};
