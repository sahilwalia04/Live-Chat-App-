// const mongoose = require("mongoose");
const userModel = require("../Model/mongoDbSchema");
const bycrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const signin = async (req, res) =>{
    console.log("chal geya signin ");
    
    const {username , email , password} = req.body;
    if(!username || !email || !password){
        return res.status(400).json({
            message: "Please fill all the fields",
        })
    }
    // console.log(username , email , password);
    const passwordHash = await bycrypt.hash(password , 10);
    console.log("hashpassword" , passwordHash);
   
    try{
        const user = await userModel.create({
            name : username,
            email : email,
            password : passwordHash,
        })
        res.json({
            message: "User signed in successfully",
            data: {
                username,
                email,
                passwordHash,
            },
        });
        
    }catch(e){
        console.log(e);
        res.status(500).json({
            message: e.message,
        })     
    }   
}



const login = async (req ,res) =>{
    console.log("login chal geya ");
    
    const {email , password} = req.body;
    if(!email || !password){
        return res.status(400).json({
            message: "Please fill all the fields",
        })
    };
    try{
        const user = await userModel.find({email : email});
     const isCorrectPasswrd  = await  bycrypt.compare(password , user[0].password ) ;
     console.log("password" , password);
     
    //  console.log("isCorrectPasswrd" , isCorrectPasswrd);
   
        if(!isCorrectPasswrd){
            return res.status(400).json({
                message: "Invalid password",
            })
        }

        const token = jwt.sign({id: user[0]._id} , process.env.JWT_SECRET_KEY , {expiresIn: "1h"});
        console.log("token" , token);

         await res.cookie("token" , token , {
            
            httpOnly: true,
            
            // maxAge:  30*60 * 1000, // 30 minutes
            // secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            expires : new Date(Date.now() + 30*60*1000),// 30 minutes
        });
        
        
        
        res.json({
            message: "User logged in successfully",
            user: ({
                "email":user[0].email,
                "password" : user[0].password,         
        })        
        });
    }catch(e){
        console.log(e);
        res.status(500).json({
            message: e.message,
        })     
    }
    
}

module.exports ={
    signin,
    login,
}