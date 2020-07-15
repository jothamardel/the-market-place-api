const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const businessRoute = require('./routes/business.route');
const adminRoute = require('./routes/admin-login.route');
const { get404 } = require('./controllers/error.controller');

exports.knex = require('knex')({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'market',
    password : 'market',
    database : 'market'
  }
});

app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.use('/api/auth', adminRoute);
app.use('/api', businessRoute);
app.use(get404);

app.listen(3000, () => console.log('Server running on PORT 3000.'))