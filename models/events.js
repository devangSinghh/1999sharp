const mongoose = require('mongoose')

const users_participating = mongoose.Schema({
    id : String
})

const event = new mongoose.Schema({
    title: String,
    description: String,
    date:String,
    created:String,
    duration : String,
    type: String, //Private or Public
    users : [users_participating]
})

module.exports = mongoose.model('events', event)