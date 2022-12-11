const express= require("express");
const bcrypt= require("bcrypt-nodejs");
const cors= require("cors")

const app= express();
const knex = require('knex');

const register= require('./controllers/register')
const signin= require('./controllers/signin')
const profile= require('./controllers/profile');
const image = require('./controllers/image');

const db= knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : '123',
      database : 'smart-brain'
    }
  });

// db.select('*').from('users').then(data=>{
//     console.log(data)
// })

app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use(cors())


app.get("/", (req,res)=>{
    res.send('success')
})

// SignIn

app.post("/signin", (req,res)=>{signin.handlerSignin(req,res,db,bcrypt)})

//Register

app.post("/register", (req,res)=>{register.handleRegister(req,res,db,bcrypt)})

//Profile/:userId

app.get("/profile/:id", (req,res)=>{profile.handleProfileGet(req,res,db)})

// Image
app.put("/image",(req,res)=>{image.handlerImage(req,res,db)})

// /imageurl

app.post("/imageurl",(req,res)=>{image.handleApiCall(req,res)})

app.listen(process.env.PORT || 3000, ()=>{
    console.log(`App is running on port ${process.env.PORT}`)
})


/* 
   /---> res= this is working
   /signin--->POST- res= success/failue
   /register--->POST- res= user added
   /profile/:userId--->GET---USER
   /image--> PUT = UPDATED USER
*/

