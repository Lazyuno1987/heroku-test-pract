const mongoose = require('mongoose')
const schema = mongoose.Schema({
    id: String,
    name: String,
    phone:String
})

const Contact = mongoose.model("contact", schema)

module.exports = Contact;