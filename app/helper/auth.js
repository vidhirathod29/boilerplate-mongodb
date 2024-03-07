var mongoose = require('mongoose');

var auth = new mongoose.Schema({
    firstname: {type:String},
    lastname:{type :String},
    gender:{
        type:String,
        enum:['male','female','others']
    },
    hobby:{type :Array},
    city:{type:String},
    mobile: { type: Number },
    email: { type: String },
    password: { type: String },
    image: { type: String }
})
var authModel= mongoose.model('Auth',auth);
module.exports={authModel};