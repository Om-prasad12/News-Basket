const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://omprasadsahu12:Omprasad2004@cluster0.bkw5zki.mongodb.net/test",{
    // useCreatIndex:true,
    useNewUrlParser:true,
    useUnifiedTopology:true} )
.then( () => console.log("Connection Sucessful..."))
.catch((err) => console.log(err));
