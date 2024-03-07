var mongoose = require('mongoose');

const contact = new mongoose.Schema({
    contactName: {type:String},
    email:{type:String},

})
var contactModel =mongoose.model('Contact',contact);
module.exports ={contactModel};