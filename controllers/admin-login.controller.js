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
      const userInfo = {
        name: data[0].name,
        id: data[0]._id
      }
      return res.status(200).json(userInfo);
    }
    res.status(400).json('login credentials incorrect!')
  })
  .catch((error) => {
    res.status(400).json('Incorrect Credentials!')
  })
}