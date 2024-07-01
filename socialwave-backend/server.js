const express= require("express")
const app= express()
const mongoose= require("mongoose")
const cors=require("cors")

const userRouter=require("./routes/user")
require('dotenv').config();

const port=3200

mongoose.connect(process.env.NODE_DB).then(()=>{
    console.log("connection Successful");
}).catch((err)=>{
    console.log(err);
})

app.use(cors())
app.use(express.json())
app.use("/user",userRouter)
app.use((err, req, res, next) => {
    if (err instanceof Error) {
        res.status(400).json({ success: false, errorMessage: err.message });
    } else {
        res.status(401).json({ success: false, errorMessage: 'Unauthorized' });
    }
});

app.listen(port,()=>{
    console.log(`server running on port ${port}`);
})