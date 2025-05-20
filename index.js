const express= require("express");
const mysql = require("mysql2");
const bcrypt = require("bcryptjs");
//Es module
//import express from express
//import mysql from "mysql2"
const app=express();
app.use(express());
const connection = mysql.createConnection({
    port: 3306,
    host: "localhost",
    database: "Edtech_class",
    user: "root",
    password: ""
}).promise();
//welcome endpoint
app.get("/",(req,res)=>{
    return res.send("welcome to me");
});

// app.post("/register",(req,res)=>{
// try{
//    // const name= req.body.name;
//    // const password= req.body.password;
//     //const email= req.body.email;
//     const{name,email,password}= req.body
  
//     //check if the email is saved to database
// const sql= "select email from users where email= ?";
// connection.query(sql, [email], (err,result)=>{
//     if(err){
//         console.log(error);
//         return res.status(500).json({massage: err,message});
//     }
//     if(result.length>0){
//         return res.status(4009).json({message: "email is already taken please try again with another one "})
//     }
// //hashing password
// const hashedpassword = bcrypt.hashsync(password);
// const query = "insert into users(email,password,name)values(?,?,?)";
// connection.query(query,[email,hashedpassword,name], (err2, result2) =>  {

//     if (err2) {
//         console.log(err2);
//         return res.status(500).json({massage: err,message});
//     };

//     console.log(result2);
//     return res.status(201).json({message: " registration is successful"});
// })
// })

// } catch (error2) {
//         console.log(result2);
//         res.status(201).json({message: error2,message});
 
//     };
// })
    
//using promise base mysql
app.post("/signup",async(req,res)=>)
try{
    const{name,email,password} = req.body;
    //check if email exist in the database
    const sql = "select email from users where email=?";
    const [result] = await connection.query(sql,[email]);
    if(result.length> 0){
    return res.status(409).json({message: "email is already registerd"});
    }

   // const hashedpassword = await bcrypt.hash(password, 10),
    const hashedpassword = bcrypt.hashSync(password, 10);

    const insertquery=
   "insert into (email,password,name) values(?,?,?)";
   const[insertresult] = await connection.execute(insertquery,[email,hashedpassword,name]);
    console.log(insertresult);
    return res.status(201).json({message: "registration is successful"});

 } catch (error) {
        console.log(err);
        return res.status(500).json({massage: err,message});
}

//
app.get("/users",async(req,res)=>{
    try {
        const sql = "select * from users";
        const [result ]= await connection.query (sql);
        return res.status(208).json(result);


    } catch (error) {
        console.log(error);
        res.status (500).json({massage: err,message});
    }
    
});

//retrive single records y id where id is passed as params

app.get("/users/:userId", async (req,res)=>{

    try {
        
        const { userId } = req.params;
        //or
        // const { userId } = req.params.userId;
        const sql = "select*from users where id=?"
       

        if (result.length ===0){
            return res.status(404).json({message: "user not found"});
        }
 const[result] = await connection.query(sql,[userId]);
    } catch (error) {
        console.log(err);
        return res.status(500).json({massage: err,message});
    }

//some missed codes ididnt wrote







});

//deleting user
app.delete("/users/:userId",async(req, res)=>{
    const userId=req.params.userId;
    try {
        const query = "delete from users where id=?";
        const [result] = await connection.query(,[userId]);
        
        if (result.affectedRows ===0){
            return res.status(404).json({message: "user record not found"});
        }

            return res.status(404).json({message: "deleted"})
        
    }  catch (error) {
        console.log(err);
        return res.status(500).json({message: "error.message"})
    }
})


// app.post("/erty", async (req, res)=>{
    try {
        
    } catch (error) {
        
    }

app.listen(3006,()=>console.log("server is running on port 3006"));