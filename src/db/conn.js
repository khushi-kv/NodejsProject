const mongoose=require("mongoose");
//create db
mongoose.connect("mongodb://localhost:27017/NodeProject",{   //returns promise
   

}).then(()=>{
    console.log("Success!");
}).catch((error)=>{
console.log(error);
})