var mongoose= require('mongoose');

var testimonial = new mongoose.Schema({

    testimonialName : {type : String},
    designation : {type : String},
    testimonialDescription : {type : String},
    image: {type : String }
})
var testimonialmodel= mongoose.model('Testimonial',testimonial);
module.exports= {testimonialmodel};