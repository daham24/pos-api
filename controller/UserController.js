const userSchema = require('../model/UserSchema');
const bcrypt = require('bcrypt');
const salt = 10;
const nodemailer = require('nodemailer');
const jsonwebtoken = require('jsonwebtoken');
const register = (req,res) => {

    userSchema.findOne({'email':req.body.email}).then(result=>{
        if(result == null){
            bcrypt.hash(req.body.password, salt, function (err,hash){
                if (err){
                    return res.status(500).json(err);
                }
                const user = new userSchema({
                    fullName:req.body.fullName,
                    password:hash,
                    email:req.body.email,
                    activeState:req.body.activeState
                });

                const transporter = nodemailer.createTransport({
                    service:'gmail',
                    auth:{
                        user:'dpurubokka@gmail.com',
                        pass:'xohp tymi neut qprr'
                    }
                });

                const mailOption = {
                    from:'dpurubokka@gmail.com',
                    to:req.body.email,
                    subject:'New Account Creation',
                    text:'You Have Successfully Created Your Account!'
                }

                transporter.sendMail(mailOption, function (error, info){
                    if(error){
                        return res.status(500).json({'error':error});
                    }else {
                        user.save().then(saveResponse=>{
                            return res.status(201).json({'message':'Saved!'});
                        }).catch(error=>{
                            return res.status(500).json(error);
                        })
                    }
                });

            })
        }else{
            return res.status(409).json({'err': 'already exists!'})
        }
    })



}
const login = (req,res) => {
    userSchema.findOne({'email':req.body.email}).then(selectedUser=>{
        if(selectedUser!==null){
            bcrypt.compare(req.body.password, selectedUser.password, function (err, result){
                if(err){
                   return  res.status(500).json({'message':'Internal Server Error!'})
                }

                if (result){
                    const payload = {
                        email:selectedUser.email
                    }
                    const secretKey = process.env.SECRET_KEY;

                    const token = jsonwebtoken.sign(payload, secretKey, {expiresIn:'24h'});
                    return  res.status(200).json({'token':token})
                }else {
                    return  res.status(401).json({'message':'Password is incorrect!'})
                }


            })
        }else {
            res.status(404).json({'message':'Not Found!'})
        }
    })
}

module.exports = {
    register,login
}