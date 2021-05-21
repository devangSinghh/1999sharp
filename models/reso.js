const mongoose = require('mongoose');

const keepitup = new mongoose.Schema({
    userid:String
}) 

const reso = new mongoose.Schema({
    userid:String,
    username:String,
    reso:String,
    created:String,
    keepitup:[keepitup]
})

module.exports = mongoose.model('Reso',reso);