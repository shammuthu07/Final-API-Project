const mongoose = require('mongoose');


mongoose.connect("mongodb+srv://shammuthu07_db_user:abishyam0523@cluster0.i7jda2w.mongodb.net/").then(()=>{
    console.log("db is connected");
}).catch((error)=>{
    console.log("DB is not connect", error);
})