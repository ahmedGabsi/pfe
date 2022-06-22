import jwt from 'jsonwebtoken'
const isAdmin=(req,res,next)=>{
    const headers=req.headers
    try{
        if(headers.authorization){
    const token=headers.authorization.split(' ')[1]
    let decodeToken
    decodeToken =jwt.verify(token,'USER_TOKEN_SECRET')

    if(decodeToken.role==="ADMIN"){
    req.adminId=decodeToken?.id    
    next()

    }
    

    // if(!req.userId && req.userId !== String(currentId)){
    //     res.status(404).json({message:'Invalid user ID'})
    //             throw 'Invalid user ID';


    // }
   
}
else 
res.status(401).json({message:'Unauthorized'})
   }
   catch(err){
       console.log(err)
   }
}

export default isAdmin