const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const businessRoute = require('./routes/business.route');
const adminRoute = require('./routes/admin-login.route');
const { get404 } = require('./controllers/error.controller');

dotenv.config();


const corsOptions = {
  origin: 'https://the-market-place.vercel.app'
}

app = express();

if (process.env.NODE_ENV === 'production') {
  app.use(cors(corsOptions));
}
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
