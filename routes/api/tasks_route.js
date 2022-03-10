const { v4: uuidv4 } = require('uuid');
const express = require("express")

const router = express.Router()

let tasks = [
    {
        "id":1,
        "title":"today need do what",
        "description":"hello here"
    },
    {
        "id":2,
        "title":"today need do what",
        "description":"hello here"
    },
    {
        "id":3,
        "title":"today need do what",
        "description":"hello here"
    }
]

const check = (req,res,next)=>{
    console.log("check")
    next()
}

router.use(check)

router.get("/",(req,res)=>{
    res.json(tasks)
}).post("/",(req,res)=>{
    const obj = {
        "id":uuidv4(),
        "title":req.body['title'],
        "description":req.body['description']
    }
    tasks.push(obj)
    res.status(200).json({
        "message":"ok"
    })
})

router.get("/:id",(req,res)=>{
    const obj = tasks.filter((task)=>{
        return parseInt(req.params.id)===task.id
    })
    res.json(obj[0])
}).post("/:id",(req,res)=>{
    tasks= tasks.filter((task)=>{
        return parseInt(req.params.id) !== task.id
    })
    res.json({
        "message":"ok"
    })
})

module.exports = router