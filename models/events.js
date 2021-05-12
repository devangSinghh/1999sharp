const mongoose = require('mongoose')

const users_participating = mongoose.Schema({
    id : String
})

const event = new mongoose.Schema({
    name: String,
    date:String,
    duration : String,
    users : [users_participating]
})

module.exports = mongoose.model('events', event)