const express =require("express");
const app=express();
const port =process.env.PORT || 3000;   //process.env is needed when we host a website it automatically finds port numbers

const path=require("path")
require("./db/conn");
const User=require("./models/user");
const hbs=require("hbs");

//for setting path
const staticpath=path.join(__dirname,"../public");
const templatespath=path.join(__dirname,"../templates/views");
const partialspath=path.join(__dirname,"../templates/partials");
//middleware
app.use('/css',express.static(path.join(__dirname,"../node_modules/bootstrap/dist/css")));//this path is now included in /css 
app.use('/js',express.static(path.join(__dirname,"../node_modules/bootstrap/dist/js"))); //for js
app.use('/jq',express.static(path.join(__dirname,"../node_modules/jquery/dist"))); //for jquery

app.use(express.urlencoded({extended:false})) // To show the data after submitting! we have to tell express to show.

app.use(express.static(staticpath))

//setting view engine hbs
app.set("view engine","hbs");
app.set("views",templatespath); //we have to tell that now view is changed to templatespath
hbs.registerPartials(partialspath);


//routing
//ap.get(path,callback)
app.get("/home",(req,res)=>{
    res.render("home");
})
app.post("/contact",async(req,res)=>{
    try{
        //res.send(req.body);
        const userData=new User(req.body);
        await userData.save();
        res.status(201).render("home");
    }
    catch(error){
        res.status(500).send(error)  //server error
    }
})
//server create
app.listen(port,()=>{
    console.log(`running at port num. ${port}!`);
})