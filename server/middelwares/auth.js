import jwt from 'jsonwebtoken'
const auth=(req,res,next)=>{
    const headers=req.headers
    try{
        if(headers.authorization){
    const token=headers.authorization.split(' ')[1]
    let decodeToken
    if(token && token.length < 500){
     decodeToken =jwt.verify(token,'USER_TOKEN_SECRET')
    req.userId=decodeToken?.id
    }
    else {
        decodeToken=jwt.decode(token)
        req.userId=decodeToken?.sub
       
    }

    // if(!req.userId && req.userId !== String(currentId)){
    //     res.status(404).json({message:'Invalid user ID'})
    //             throw 'Invalid user ID';


    // }
   
    next()
}
else 
res.status(401).json({message:'Unauthorized'})
   }
   catch(err){
       console.log(err)
   }
}

export default auth