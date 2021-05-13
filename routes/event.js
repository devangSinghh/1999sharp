const router = require('express').Router();
const User = require('../models/user');
const Events = require('../models/events');
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
        res.send("success");
    }catch(e){
        res.send(e);
    }
})
module.exports= router;