const User = require('../models/user');


exports.createAdmin = (req, res) => {
  const { name, password } = req.body;
  const user = new User({
    name: name,
    password: password
  })
  user
  .save()
  .then((data) => {
    res.status(200).json('Admin Created!')
  })
  .catch((error) => {
    console.log(error);
    res.status(400).json('Unable to create admin')
  });
}

exports.adminLogin = (req, res) => {
  const { name, password } = req.body;

  User.find({ name: name, password: password })
  .then((data) => {
    if (data) {
      return res.status(200).json('Login successful!');
    }
    res.status(400).json('login credentials incorrect!')
  })
  .catch((error) => {
    res.status(400).json('Incorrect Credentials!')
  })
}