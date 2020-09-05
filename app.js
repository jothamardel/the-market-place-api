const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const businessRoute = require('./routes/business.route');
const adminRoute = require('./routes/admin-login.route');
const userRoute = require('./routes/user.route');
const { get404 } = require('./controllers/error.controller');

dotenv.config();


// const corsOptions = {
//   origin: 'https://the-market-place.vercel.app'
// }

var whitelist = ['https://the-market-place.vercel.app'];

var corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  if (whitelist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false } // disable CORS for this request
  }
  callback(null, corsOptions) // callback expects two parameters: error and options
}

app = express();

if (process.env.NODE_ENV === 'production') {
  app.use(cors(corsOptionsDelegate));
} else {
  app.use(cors(corsOptionsDelegate));
}
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/auth', adminRoute);
app.use('/api/auth', userRoute);
app.use('/api', businessRoute);
app.use(get404);

const PORT = process.env.PORT || 3000

mongoose
  .connect(process.env.MONGODB_ATLAS_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => {
    app.listen(PORT, () => console.log(`Connected to MongoDB Atlas. Server running on PORT: ${PORT}`));
  })
  .catch(err => {
    console.log('Unable to connect to Atlas.....', err);
  });
