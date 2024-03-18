const express = require('express');
const app = express();
require('./app/helper/db');
const route = require('./app/routes/route');
const bodyParse = require('body-parser');
const path= require('path')

require('dotenv').config();

app.use(bodyParse.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', route);
app.use(require('./app/helper/error').handleJoiErrors);
app.use(require('./app/helper/error').handleErrors);

app.use('/public/uploads', express.static(path.join(__dirname, 'uploads')));
const port = process.env.PORT;
app.listen(port, () => console.log(`Listening on http://localhost:${port}`));
