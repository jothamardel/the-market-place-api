const CreateUser = require('../models/create-user');


exports.createNewUser = (req, res) => {
  const { firstName, lastName, number, email, city, state, password } = req.body;
  const newUser = new CreateUser({
    firstName: firstName,
    lastName: lastName,
    mobile: number,
    email: email,
    city: city,
    state: state,
    password: password
  })
  newUser
    .save()
    .then((data) => {
      res.status(200).json('Successful proceed to login!')
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json('Unable to create user')
    });
}


exports.loginUser = (req, res) => {
  const { number, password } = req.body;

  CreateUser.find({ number: number, password: password })
    .then((data) => {
      if (data[0].mobile) {
        const userInfo = {
          ...data
        }
        return res.status(200).json(userInfo);
      }
      res.status(400).json('login credentials incorrect!')
    })
    .catch((error) => {
      res.status(400).json('Incorrect Credentials!')
    })
}