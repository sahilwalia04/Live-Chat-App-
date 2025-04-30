const jwt = require("jsonwebtoken");
const verifytokens = (req , res , next)=>{
    const token = req.cookies?.token;
    console.log(token);
    if(!token){
        return res.status(401).json({
            success: false,
            message: "Unauthorized token",
        })
    }
    const verify = jwt.verify(token , process.env.JWT_SECRET_KEY);
   if(!verify){
        return res.status(401).json({
            success: false,
            message: "Unauthorized verify",
        })
    }
    
    res.json({
        success: true,
        message: "Token verified successfully",
    })
    
} 
module.exports = verifytokens;