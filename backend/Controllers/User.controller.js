const user = require('../Modal/User.Schema');
const jwt = require('jsonwebtoken');
const bcrypt= require('bcrypt');
const {check , validationResult} = require('express-validator')
exports.signUp = (req,res) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty())
    {
        console.log(errors.array()[0].msg);
        return res.status(200).json({
            error: errors.array()[0].msg
          });
    }
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const newUser = new user({
        Name:name,
        Email:email,
        password:password
    })
    newUser.save((err,result) => {
        if(err)
        {
            return res.status(402).json({
                err: "NOT able to save user in DB"
              });
        }
        else
        {
            const token = jwt.sign({id:result.password},"blogs");
            console.log(result);
            res.cookie('token',token,{ 
                maxAge: 1000 * 60 * 15, // would expire after 15 minutes
                httpOnly: true, // The cookie only accessible by the web server
                signed: true 
            });
            const { _id, Name, Email } = result;
            return res.json({result:{_id,Name,Email},token});
        }    
    })
}

exports.login = (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty())
        return res.status(402).json({error:errors.array()[0].msg})
    const email = req.body.email;
    const password = req.body.password;
    user.findOne({Email:email},function(err,data){
        if(err || !data)
            return res.json({'msg':'Invalid Email address'}); 
        const hashed_password = data.password;
        bcrypt.compare(password,hashed_password,function(err,result){
            if(result === false || err)
                return res.json({'error':"Invalid Email Id or Password"})
            const token = jwt.sign({id:result.password},"blogs");
            console.log(result);
            res.cookie('token',token,{ 
            maxAge: 1000 * 60 * 15, // would expire after 15 minutes
            httpOnly: true, // The cookie only accessible by the web server
             signed: true 
            });
            const {Name,_id , Email} = data;
            return res.json({result:{_id,Name,Email} , token})
        })
    })
}