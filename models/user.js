const mongoose = require('mongoose')

const kind = new mongoose.Schema({
    provider: String,
    id:String
})

const user = new mongoose.Schema({
    name : String,
    email : String,
    password : String,
    session_id : String,
    kind : [kind],
    theme : String,  //0 for white, 1 for dark
})

module.exports = mongoose.model('users', user)