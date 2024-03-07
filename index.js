const express = require('express');
const app = express();
const database = require('./app/helper/db');
const route = require('./app/routes/route');
app.use('/', route);
const port = 6000
app.listen(port, () => console.log(`Listening on http://localhost:${port}`));