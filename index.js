const express=require("express")
const app=express()
const bodyParser=require("body-parser")
app.use(bodyParser.json());
require("./route/booking")(app)

app.listen(4000,()=>{
    console.log("server is started")
})
