const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://omprasadsahu12:bKPy3duZWQxU9Tlu@cluster0.bkw5zki.mongodb.net/?retryWrites=true&w=majority",{
    // useCreatIndex:true,
    useNewUrlParser:true,
    useUnifiedTopology:true} )
.then( () => console.log("Connection Sucessful..."))
.catch((err) => console.log(err));
