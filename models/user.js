const mongoose = require('mongoose')

const kind = new mongoose.Schema({
    provider: String,
    id:String
})
const event = new mongoose.Schema({
    eventid:String
})
const keepitup = new mongoose.Schema({
    resoid: String
})
const reso = new mongoose.Schema({
    resoid:String
})
const user = new mongoose.Schema({
    name : String,
    dname:String,
    email : String,
    password : String,
    session_id : String,
    userid:String,
    reso:[reso],
    keepitup:[keepitup],
    kind : [kind],
    event:[event],
    resetpass: String,
    theme : String,  //0 for white, 1 for dark
})

module.exports = mongoose.model('users', user)