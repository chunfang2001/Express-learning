const express = require('express')

const app = express()
const { PrismaClient } = require('@prisma/client')
const router = require('./routes/task')

const prisma = new PrismaClient()
// use `prisma` in your application to read and write data in your DB
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use("/api/tasks",router)

app.get("/",(req,res)=>{
    res.send("hello")
    
})

app.get("/create",(req,res)=>{
    const create = async () => {
        const newUser = await prisma.User.create({
            data:{
                name: 'Alice',
                email: 'alice@prisma.io',
            }
        })
    }
    create()
    res.send("created")
})

app.get("/get",async (req,res)=>{
    const create = async () => {
        const newUser = await prisma.user.findMany({
            select:{
                name:true,
                email:true
            }
        })
        console.log(newUser)
        
    }
    await create()
    res.send("get")
})

app.listen(3000,()=>{
    console.log("hello")
})