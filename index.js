 require("dotenv").config();
const express=require('express');
const connection= require("./db");
const app=express();
const authRoute=require("./routes/auth.js");
const hotelsRoute=require("./routes/hotels");
const userRoute=require("./routes/user");
const roomsRoute=require("./routes/rooms");
const cookieParser=require('cookie-parser');
const cors = require('cors');
const path = require('path');

connection()

const clientPath=path.join(__dirname, 'client/dist');
const adminPath=path.join(__dirname, 'admin/build');

app.use(cookieParser())
app.use(express.json())
app.use(cors());
app.use("/auth",authRoute)
app.use("/hotels",hotelsRoute)
app.use("/users",userRoute)
app.use("/rooms",roomsRoute)

app.use(express.static(clientPath));
//app.use('/admin', express.static(adminPath));

// app.get('/admin', function (_, res){
//   res.sendFile(path.join(__dirname, "/admin/build/index.html"), function(err){
//     res.status(500).send(err);
//   })
// })


// app.get('*', function (_, res){
//   res.sendFile(path.join(__dirname, "/client/dist/index.html"), function(err){
//     res.status(500).send(err);
//   })
// })



app.use((err,req,res,next)=>{
    const errorStatus=err.status||500
    const errorMessage=err.message||"something went wrong"
    return res.status(errorStatus).json({
        success:false,
        status:errorStatus,
        message:errorMessage,
        stack:err.stack,
    })
})

const port=process.env.PORT||8800;
app.listen(port,console.log(`listening on port ${port}...`))