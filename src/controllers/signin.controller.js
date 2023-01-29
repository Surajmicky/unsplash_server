const User = require('../models/user.model');
const express = require('express');
const signinrouter= express.Router()
const bcrypt=require('bcrypt')
const jwt= require('jsonwebtoken')
signinrouter.post('/signin',async(req,res)=>{
    const registeredUser = await User.findOne({ email: req.body.email });
    if (!registeredUser) {
      

      return res.json({message:'User not found'});
    }
    let {email,password}=req.body;
    const correctUser= bcrypt.compareSync(password, registeredUser.password);
    console.log(correctUser)
    if(correctUser){
        const token = jwt.sign(
            { firstName: registeredUser.firstName,lastName:registeredUser.lastName, email: registeredUser.email },
            'unsplash'
          );
          let avatar_name= firstName[0]+lastName[0];
          avatar_name= avatar_name.toUpperCase()
        return  res.send({token:token,avatar_name})
    }else {
        res.send({message:"something went wrong"})
    }
    
})
module.exports= signinrouter;