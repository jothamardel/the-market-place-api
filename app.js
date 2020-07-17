const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const businessRoute = require('./routes/business.route');
const adminRoute = require('./routes/admin-login.route');
const { get404 } = require('./controllers/error.controller');



if (process.env.NODE_ENV === 'development') {
  exports.knex = require('knex')({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'market',
      password : 'market',
      database : 'market'
    }
  });
}

if (process.env.NODE_ENV === 'production') {
  exports.knex = require('knex')({
    client: 'pg',
      connection: {
        connectionString: process.env.DATABASE_URL,
        ssl: {
          rejectUnauthorized: false
        }
      }
  });
}







app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.use('/api/auth', adminRoute);
app.use('/api', businessRoute);
app.use(get404);

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server running on PORT: ${PORT}`))