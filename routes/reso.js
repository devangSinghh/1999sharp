const router = require('express').Router();
const Reso = require('../models/reso');
const User = require('../models/user');

router.post('/add',async (req, res)=>{
    try{
        const newreso = new Reso({
                userid:String,
                username:String,
                reso:String,
                created:String,
                keepitup:[]
        })
        const savedreso = await newreso.save();
        const user = await User.findOneAndUpdate({userid:req.body.userid},{
            $push:{
                reso:savedreso._id
            }
        })
        res.send("reso added");

    }catch(e){
        res.send(e);
    }
})
router.post('/update',async (req, res)=>{
    try{
        const ureso = await Reso.findByIdAndUpdate(req.body.resoid,{
            $set:{
                reso:req.body.reso,
            }
        })
        res.send("reso updated");

    }catch(e){
        res.send(e);
    }
})
router.post('/delete',async (req, res)=>{
    
    try{
        const ureso = await Reso.findByIdAndRemove(req.body.resoid);
        const user = await User.findOneAndUpdate({userid:req.body.userid},{
            $pull:{
                reso:req.body.resoid
            }
        })
        res.send("reso deleted");

    }catch(e){
        res.send(e);
    }
})
router.get('/all', async (req, res)=>{
    try{
        const allreso = await Reso.find({});
        res.send(allreso);
    }
    catch(e){
        res.send(e);
    }
})
router.post('/eachreso',async (req, res)=>{
    try{
        const reso = await Reso.findById(req.body.resoid);
        res.send(reso);
    }catch(e){
        res.send(e);
    }
})

module.exports = router;