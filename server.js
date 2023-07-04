const express = require('express');
const serverConfig = require('./configs/server.config');
const mongoose = require('mongoose');
const dbConfig = require('./configs/db.config')
const userModel = require('./models/user.model')
const bcrypt = require('bcrypt')

const app = express();

// logic to  connect mongodb and create admin
// need to have the mongodb up and running in your local machine


mongoose.connect(dbConfig.DB_URL)
const db = mongoose.connection;

db.on("error" , ()=>{
    console.log("error while connection to db");
})

db.once("open" , ()=>{
    console.log("DB is connected");

    init()
})

async function init(){
    // initialize the mongodb
    // need to create the ADMIN user

    // check if the admin user is already present
    let admin = userModel.findOne({
        userId: "admin"

    })

    if(admin){
        console.log("admin user already present");
        return
    }

   admin = await userModel.create({

    name : "Vishwa Mohan",
    userId : "admin",
    email : "kankvish@gmail.com",
    userType : "ADMIN",
    password : bcrypt.hashSync("Welcome1",8)
});
console.log(admin);
}

app.listen(serverConfig.PORT,()=>{
    console.log(`server started on the port number ${serverConfig.PORT}`);
})