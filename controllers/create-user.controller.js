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
  console.log("Req.body: ", req.body)
  CreateUser.find({ mobile: req.body.number, password: req.body.password })
    .then((data) => {
      // console.log("Data from DB: ", data)
      if (data.length) {
        // const userInfo = { ...data }
        // console.log(data)
        return res.status(200).json(data);
      }
      console.log("From database: ", data)
      res.status(400).json('login credentials incorrect!')
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json('Something went wrong!')
    })
}