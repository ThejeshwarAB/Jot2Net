const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const path = require("path");

require('dotenv').config();
const nodemailer = require('nodemailer');
// const { getMaxListeners } = require('process');

app.listen("https://jot2net.herokuapp.com/",(err) =>{
    if(err)
    throw err;
    else
    console.log("Server is running")
})

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')))


var transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: "nuser3899@gmail.com",
        pass: "ebbmaxxrujjncknp"
    },
    tls: {
        rejectUnauthorized: false,
        secureProtocol: "TLSv1_method"
    }
});

app.get('/',(req,res)=>{   
    res.sendFile(path.join(__dirname,'index.html'));
});

app.post('/',(req,res)=>{
    var mailOptions = {
        from: "nuser3899@gmail.com",
        to: req.body.mail,
        subject: req.body.subj + " from " + req.body.name, 
        text: req.body.content,
    };

    transporter.sendMail(mailOptions,function(err,info){
        if(err){
            console.log(err)
            res.send("Mail not sent. Try again!");}
        else
            res.send("Mail sent successfully");
    })
})