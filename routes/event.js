const router = require('express').Router();
const AWS = require('aws-sdk');
const User = require('../models/user');
const Events = require('../models/events');

AWS.config = new AWS.Config();
AWS.config.accessKeyId = process.env.aws_access_key;
AWS.config.secretAccessKey = process.env.aws_secret_key;
AWS.config.region = process.env.aws_reigon;


var ses = new AWS.SES();

router.post('/update', async(req, res)=>{
    try{
        const event = await Events.findByIdAndUpdate(req.body.eventid,{
                $set:{
                    title: req.body.title,
                    description: req.body.description,
                    date: req.body.date,
                    duration: req.body.duration,
                    type:req.body.type
                }
            })
            const email=req.body.useremail;
            var ses_mail = "From: '1999Sharp' <" + email + ">\n";
            ses_mail = ses_mail + "To: " + email + "\n";
            ses_mail = ses_mail + "Subject: Event Updated Sucessfully\n";
            ses_mail = ses_mail + "MIME-Version: 1.0\n";
            ses_mail = ses_mail + "Content-Type: multipart/mixed; boundary=\"NextPart\"\n\n";
            ses_mail = ses_mail + "--NextPart\n";
            ses_mail = ses_mail + "Content-Type: text/html; charset=us-ascii\n\n";
            ses_mail = ses_mail + "This is should be a html text.\n\n";
            ses_mail = ses_mail + "--NextPart\n";
            ses_mail = ses_mail + "Content-Type: text/plain;\n";
            ses_mail = ses_mail + "Your Event "+ req.body.title + "has been updated!!";
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
        res.send('success');
    }catch(e){
        res.send(e);
    }

})

router.get('/user/:eventid', async(req, res) => {
    try{
        const event = await Events.findById(req.params.eventid);
        res.send(event);
    }catch(e){
        res.send(e);
    }
})
router.post('/new', async(req, res)=>{
    try{
        const newevent = new Event({
            title: req.body.title,
            description: req.body.description,
            date: req.body.date,
            created: req.body.created,
            duration : req.body.duration,
            type: req.body.type, //Private or Public
            users : [req.body.userid]
        })
        const savedevent = await newevent.save();
        const user = await User.findByIdAndUpdate(re.body.userid,{ 
            $push: {
                event: savedevent._id
            }
        })
        const email=req.body.useremail;
            var ses_mail = "From: '1999Sharp' <" + email + ">\n";
            ses_mail = ses_mail + "To: " + email + "\n";
            ses_mail = ses_mail + "Subject: Event Updated Sucessfully\n";
            ses_mail = ses_mail + "MIME-Version: 1.0\n";
            ses_mail = ses_mail + "Content-Type: multipart/mixed; boundary=\"NextPart\"\n\n";
            ses_mail = ses_mail + "--NextPart\n";
            ses_mail = ses_mail + "Content-Type: text/html; charset=us-ascii\n\n";
            ses_mail = ses_mail + "This is should be a html text.\n\n";
            ses_mail = ses_mail + "--NextPart\n";
            ses_mail = ses_mail + "Content-Type: text/plain;\n";
            ses_mail = ses_mail + "Your Event "+ req.body.title + "has been Added!!";
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
        res.send("success");
    }catch(e){
        res.send(e);
    }
})
router.post('/delete/:eventid', async (req, res) => {
    const event = Events.findByIdAndRemove(req.params.eventid);
    const user = User.findByIdAndUpdate(req.body.userid,{
        events:{ 
            $pull:{
                _id:req.params.eventid
            }
        }
    })
})

module.exports= router;