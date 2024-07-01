const nodemailer = require("nodemailer")
require('dotenv').config();
const ejs = require('ejs');
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAILPASSWORD
    }
});
const welcomeMsg = (sendTo, subject) => {
    
    ejs.renderFile(__dirname + '/template/welcome.ejs', { firstName: sendTo.firstName, lastName: sendTo.lastName }, (err, data) => {
        if (err) {
            console.log(err);
        }
        else {
            const mailOptions = {
                from: process.env.EMAIL,
                to: sendTo.email,
                subject: subject,
                html: data
          
            };
            
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    // console.log('Email sent: ' + info.response);
                }
            });
        }
    })
}
const forgetPassword = (sendTo, subject, message) => {
 
    ejs.renderFile(__dirname + '/template/welcomeBack.ejs', { firstName: sendTo.firstName, lastName: sendTo.lastName , message }, (err, data) => {
        
        if (err) {
            console.log(err);
        }
        else {
            const mailOptions = {
                from: process.env.EMAIL,
                to: sendTo.email,
                subject: subject,
                html: data
                 
            };
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log("error",error);
                } else {
                     console.log('Email sent: ' + info.response);
                }
            });
        }
    })
}
module.exports={welcomeMsg,forgetPassword}