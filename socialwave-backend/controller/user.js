const userModal = require("../modal/user");
const practice= require("../modal/practice")
const messages = require("../utils");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const salt = 10;
const signature = "@$%^&&&RDFGHG!@#$%$^%^&&&%%^%^Rhfdjfh^&%&%#$^*78&%&GFbg";
const nodemailer = require("nodemailer");
const { welcomeMsg, forgetPassword } = require("../emailVarification");
// Registration API 
const Signup = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    const alreadyUser = await userModal.findOne({ email: email });

    if (alreadyUser) {
      res.status(400).json({
        success: false,
        message: messages.alreadyUser,
        data: alreadyUser,
      });
    } else {
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) {
          res.status(400).json({
            success: false,
            message: messages.hash,
            data: err,
          });
        } else {
          let user = new userModal({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: hash,
          });
          user
            .save()
            .then((data) => {
              welcomeMsg(
                { email: email, firstName: firstName, lastName: lastName },
                "Welcome to  SocialWave"
              );
              res.status(200).json({
                success: true,
                message: messages.singUpSuccess,
              });
            })
            .catch((error) => {
              res.status(400).json({
                success: false,
                message: messages.singUpFailed,
                err: error,
              });
            });
        }
      });
    }
  } catch (error) {
    res.status(500).json({ error: error, message: messages.serverError });
  }
};
// login API
const Signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await userModal.findOne({ email: email });
    if (user) {
      bcrypt
        .compare(password, user.password)
        .then((match) => {
          if (match) {
            const accessToken = jwt.sign(
              { id: user.id, name: user.name, email: user.email },
              signature,
              { expiresIn: 604800 }
            );
            res
              .status(200)
              .json({
                success: true,
                message: messages.singInSuccess,
                token: accessToken,
              });
          } else {
            res
              .status(400)
              .json({ success: false, message: messages.singInFailed });
          }
        })
        .catch((error) => {
          next(error);
        });
    } else {
      res.status(401).json({ success: false, message: messages.userExist });
    }
  } catch (error) {
    res.status(500).json({ error: error, message: messages.serverError });
  }
};

// find mail for forget password 
const findEmail = async (req, res) => {
  try {
    const { email } = req.body;

    const User = await userModal.findOne({ email });
    if (User) {
      const accesstoken = jwt.sign(
        {id: User._id},
        signature
      );
      forgetPassword(
        {
          email: email,
          id: User._id,
          firstName: User.firstName,
          lastName: User.lastName,
        },
        "Reset Password",
        `${process.env.NODESERVER}/user/verifyForgetpassword/${accesstoken}`
      );
      res
        .status(200)
        .json({ success: true, data: User, msg: messages.sentLink });
    } else {
      res.status(400).json({ success: false, msg: messages.notFind });
    }
  } catch (error) {
    res.status(500).json({ error: error, message: messages.serverError });
  }
};
// verify token 
const verifyForgetpassword = (req, res) => {
  try {
    const { token } = req.params;
    res.redirect(`${process.env.React_App_verify}/${token}`);
    
  } catch (error) {
    res.status(500).json({ error: error, message: messages.serverError });
  }
};
// update Password
const updatePassword = async (req, res) => {
  try {
    const { token, password } = req.body;

    jwt.verify(token, signature, async function (err, decoded) {
        if (err) {
          res.status(400).json({
            status: false,
            msg: messages.general,
          });
        } else if (decoded) {
          console.log("decoded",decoded);
          bcrypt.hash(password, salt, async function (err, hash) {
            if (err) {
              res.status(400).json({success:false, msg:messages.general})
            } else {
              const data = await userModal.findOneAndUpdate(
                { _id:decoded.id },
                { password: hash }
              );
              if (err) {
                res
                  .status(200)
                  .json({ success: false, msg: messages.passwordNotUpdate, err });
              } else if (data) {
                res.status(200).json({
                  success: true,
                  msg: messages.passwordUpdate,
                });
              }
            }
          });
          
        }
      });

  
  } catch (error) {
    res.status(500).json({ error: error, message: messages.serverError });
  }
};
module.exports = {
  Signup,
  Signin,
  findEmail,
  updatePassword,
  verifyForgetpassword,

};
