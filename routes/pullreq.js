const router = require('express').Router();
const User = require('../models/user');

router.post('/evetpull/:userid',async(req, res)=>{
    try{
        const user = await User.findOneAndUpdate({userid:req.params.userid},{
            $push:{
                events:req.body.userevents
            }
        })
        res.send("Event Pull Sucessfull");

    }catch(e){
        res.send(e);
    }
})
// router.get('/publicevent/:userid',async(req, res)=>{
//     const public=[];
//     const user = await User.findOne({userid:req.params.userid});
//     for(var i=0;i<user.events.length;i++){
//         public.push(user.events[i]);
//     }
//     res.send(public);
// })
module.exports = router;
