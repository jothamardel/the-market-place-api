const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const businessRoute = require('./routes/business.route');
const adminRoute = require('./routes/admin-login.route');
const { get404 } = require('./controllers/error.controller');

dotenv.config();



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

const whitelist = ["https://the-market-place.vercel.app/", "http://localhost:3001"]

const corsOptionsDelegate = (req, callback) => {
  let corsOptions;
  if (whitelist.indexOf(req.header('Origin')) !== -1) {
    // reflect (enable) the requested origin in the CORS response
    corsOptions = { origin: true, credentials: true };
  } else {
    corsOptions = { origin: false, credentials: true }; // disable CORS for this request
  }
  callback(null, corsOptions); // callback expects two parameters: error and options
};




app = express();
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "https://the-market-place.vercel.app/"); // update to match the domain you will make the request from
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());


app.use('/api/auth', adminRoute);
app.use('/api', businessRoute);
app.use(get404);

const PORT = process.env.PORT || 3000

mongoose
  .connect(process.env.MONGODB_ATLAS_URI)
  .then(result => {
    app.listen(PORT, () => console.log(`Connected to MongoDB Atlas. Server running on PORT: ${PORT}`));
  })
  .catch(err => {
    console.log('Unable to connect to Atlas.....', err);
  });
