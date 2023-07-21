const express=require('express')
const mongoose=require('mongoose')
const cors=require('cors')
const multer=require('multer')
const dotenv=require('dotenv').config()
const userRouter=require('./router/user')
const cookieParser = require('cookie-parser');
const postRouter=require('./router/post')


const app=express();
const port=process.env.PORT || 3000
app.use(express.json())
app.use(cors({
    origin:['http://localhost:5173'],
    methods:['GET','POST','PATCH','DELETE'],
    credentials:true
}))
app.use(cookieParser())
app.use(express.static('Public'))
app.use('/images', express.static('images'));

app.use('/user',userRouter)
app.use('/post',postRouter)

app.listen(port,()=>{
    mongoose.set('strictQuery',false);
    mongoose.connect(process.env.MONGODB_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:false
    })
.then(()=>{
    console.log('connected to mongodb')
    console.log(`The server is running on port ${port}`)
}).catch(err=>{
    console.log(err)
});
})

