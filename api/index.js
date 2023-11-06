const express=require('express');
const cors=require('cors');
const mongoose = require('mongoose');
const User = require('./models/User');
const cookieParser=require('cookie-parser')
//const Post = require('./models/Post');
const app=express();
const bcrypt=require('bcryptjs')
const salt = bcrypt.genSaltSync(10);
const jwt=require('jsonwebtoken');
const secret = 'asdfe45we45w345wegw345werjktjwertkj';

app.use(cors({credentials:true,origin:'http://localhost:3000'}));
app.use(express.json());
app.use(cookieParser());
mongoose.connect('mongodb+srv://blog:YszFe1b6CmGoUQgR@cluster0.mrv4afk.mongodb.net/?retryWrites=true&w=majority')




app.post('/register',async(req,res)=>{
    const {username,password}=req.body;
    let userDoc
    try{
        userDoc=await User.create({username,password:bcrypt.hashSync(password,salt)}) 
    }  
    catch(e){
        res.status(400).json(e);
    } 
    res.json(userDoc);
});

app.post('/login', async (req,res) => {
    const {username,password} = req.body;
    const userDoc = await User.findOne({username});
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if(passOk)
    {
        jwt.sign({username,id:userDoc._id},secret,{},(err,token)=>{
            if(err) throw err;
            res.cookie('token',token).json('ok')
        });
    }
    else{
        res.status(400).json('wrong credentials')
    }
})
app.get('/profile', (req,res) => {  
    const{token}=req.cookies;
    jwt.verify(token, secret,{},(err,info)=>{
        if(err)throw err;
        res.json(info);
    })
    
  });

app.listen(4000);