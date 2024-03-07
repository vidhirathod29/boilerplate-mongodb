var mongoose = require('mongoose');
const {contactModel}= require('./contactModel');
const {categoryModel}= require('./categoryModel');
const {authModel}= require('./auth');
const {portfolioModel}= require('./portfolioModel');
const {testimonialmodel} = require('./testimonialModel')
mongoose.connect('mongodb://localhost:27017/boilerplate')
    .then(()=> console.log('Connected to MongoDB server successfully..'))
    .catch((err)=> console.error('Couldn\'t connect to the server ',err));

   