// // server.js
// const express = require('express');
// const bodyParser = require('body-parser');

// const routes = require('./route/route');
// // config.js
// require('dotenv').config();


// const app = express();
// const port = 3000;

// app.use(bodyParser.json());

// app.use('/', routes);

// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });
// server.js
const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config(); // Load environment variables from .env
const config = require('./config/config');
const routes = require('./route/route');

const app = express();
const port = 3001;

app.use(bodyParser.json());

app.use('/api', routes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
