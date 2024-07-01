const {Signup,Signin,updatePassword, findEmail,verifyForgetpassword}=require("../controller/user")
const express=require("express")
const userRouter=express.Router()
const { VerifyToken } = require("../middleware/verifyToken");

userRouter.post("/signUp",Signup)
userRouter.post("/signIn",Signin)
userRouter.post("/findEmail", findEmail)
userRouter.get("/verifyForgetpassword/:token",verifyForgetpassword)
userRouter.post("/updatePassword", updatePassword)


module.exports = userRouter;