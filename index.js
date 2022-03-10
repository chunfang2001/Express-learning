const express = require("express")

const app = express()
const port = 3000

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use("/api/tasks",require('./routes/api/tasks_route'))

app.get("*",(req,res)=>{
    res.send("error")
})


app.listen(port,()=>{
    console.log("the app is running")
})