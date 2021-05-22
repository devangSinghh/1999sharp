const router = require('express').Router();
const otpGenerator = require('otp-generator');
const AWS = require('aws-sdk');
const User = require('../models/user');

AWS.config = new AWS.Config();
AWS.config.accessKeyId = process.env.aws_access_key;
AWS.config.secretAccessKey = process.env.aws_secret_key;
AWS.config.region = process.env.aws_reigon;

const email="acw.dnsp@gmail.com";
var ses = new AWS.SES();

router.post('/verify', async (req, res) => {
    try{
        const otp=otpGenerator.generate(6, { upperCase: false, specialChars: false, alphabets:false});
        const user = await User.findOneAndUpdate({userid:req.body.userid},{
            $set:{
                resetpass:otp
            }
        })
        var ses_mail = "From: '1999Sharp' <" + email + ">\n";
        ses_mail = ses_mail + "To: " + email + "\n";
        ses_mail = ses_mail + "Subject: Password Reset Attempted\n";
        ses_mail = ses_mail + "MIME-Version: 1.0\n";
        ses_mail = ses_mail + "Content-Type: multipart/mixed; boundary=\"NextPart\"\n\n";
        ses_mail = ses_mail + "--NextPart\n";
        ses_mail = ses_mail + "Content-Type: text/html; charset=us-ascii\n\n";
        ses_mail = ses_mail + "This is should be a html text.\n\n";
        ses_mail = ses_mail + "--NextPart\n";
        ses_mail = ses_mail + "Content-Type: text/plain;\n";
        ses_mail = ses_mail + "Your OTP is " + otp + "and is valid for 10 min";
        ses_mail = ses_mail + "--NextPart--";
        var params = {
            RawMessage: { Data: new Buffer.from(ses_mail) },
            Destinations: [ email ],
            Source: "'1999Sharp' <" + email + ">'"
        };
        ses.sendRawEmail(params, function(err, data) {
            if(err) {
                res.send(err);
            } 
            else {
                res.send(data);
            }           
        });

    }catch(err) {
        res.send(err);
    }
})
router.post('/update', async (req, res) => {
    const user = await User.findOneAndUpdate({userid:req.body.userid},{
        $set:{
            email:req.body.email
        }
    })
})
router.post('/otp-verify', async (req, res) => {
    try{
       const user = await User.findOne({userid:req.body.userid});
        if(user.resetpass==req.body.resetpass){
            res.status(200).send("verified");
        }
        else{
            res.send("otp mismatch");
        } 
    }catch(e){
        res.send(e);
    }
    
})
module.exports = router;