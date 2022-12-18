const PORT = 3000
const express=require('express')
require('dotenv').config()
const cors=require('cors')
const routes=require('./routes/router')

const connectDB=require('./db/connect')

const app=express()
app.use(express.json())
app.use(cors())

app.use('/api',routes)


app.get('*',(req,res)=>{
    res.status(404).send("Invalid Path")
})

const start=async()=>{
    try{
        await connectDB(process.env.MONGO_URI)
        app.listen(process.env.PORT||PORT,()=>{
            console.log(`Listening at ${PORT}`)
        })
    }catch(err){
        console.log(err)
    }
}

start()