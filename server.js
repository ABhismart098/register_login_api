const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config(); // Load environment variables from .env

const routes = require('./route/route');

const app = express();
const port = 3001;

app.use(bodyParser.json());

app.use('/api', routes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
