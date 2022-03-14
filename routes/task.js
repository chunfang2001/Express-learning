const express = require('express')
const { PrismaClient } = require('@prisma/client')
const router = express.Router()

const prisma = new PrismaClient()

router.get("/",(req,res)=>{
    res.send("get message")
}).post("/",async(req,res)=>{
    var err = false
    const getUserDetail = async() =>{
        var userId = req.headers.authorization
        const result = await prisma.user.findUnique({
            where:{
                id:parseInt(userId)
            }
        })
        if(result === null){
            err = true
            return 
        }else{
            await prisma.task.create({
                data:{
                    title:req.body['title'],
                    author:{
                        connect:{
                            id:parseInt(userId)
                        }
                    }
                }
            })
            console.log(req.body['title'])
        }
    }
    
    await getUserDetail()
    if(err ===true){
        res.json({
            "message":"error"
        })
    }else{
        res.json({
            "message":"ok"
        })
    }
})

module.exports = router