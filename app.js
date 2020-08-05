const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const businessRoute = require('./routes/business.route');
const adminRoute = require('./routes/admin-login.route');
const { get404 } = require('./controllers/error.controller');



// if (process.env.NODE === 'development') {
//   const knex = require('knex')({
//     client: 'pg',
//     connection: {
//       host : '127.0.0.1',
//       user : 'market',
//       password : 'market',
//       database : 'market'
//     }
//   });
// }

// if (process.env.NODE_ENV === 'production') {
//   const knex = require('knex')({
//     client: 'pg',
//       connection: {
//         connectionString: process.env.DATABASE_URL,
//         ssl: {
//           rejectUnauthorized: false
//         }
//       }
//   });
// }


// console.log(process.env.NODE)





app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

// app.use('/', (req, res, next) => {
//   res.json('Hello World')
//   next();
// })
app.use('/api/auth', adminRoute);
app.use('/api', businessRoute);
app.use(get404);

const PORT = process.env.PORT || 3000

mongoose
  .connect('mongodb+srv://mbiplang:mbiplang123.@lutukcluster0.6k3tm.mongodb.net/business?retryWrites=true&w=majority')
  .then(result => {
    app.listen(PORT, () => console.log(`Connected to Atlas. Server running on PORT: ${PORT}`));
  })
  .catch(err => {
    console.log('Unable to connect to Atlas.....', err);
  });
