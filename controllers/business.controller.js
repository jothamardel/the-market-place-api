const Business = require('../models/business');


exports.getAllBusiness = (req, res, knex) => {
  Business.find().then((data) => {
    res.status(200).json(data);
  }).catch((error) => {
    res.staus(400).json('unable to retrieve.');
  })
}


exports.getBusinessById = (req, res, knex) => {
  const { id } = req.params
  Business.findById(id)
    .then(data => {
      res.status(200).json(data);
    }).catch((error) => {
      res.staus(400).json('unable to retrieve!')
    });
};


exports.registerBusiness = (req, res) => {
  const {
    owner, businessname,
    phoneno, email, category,
    latitude, longitude, registered,
    rcNumber, city, state, address, tag, agent
  } = req.body;
  
  const business = new Business({
    business_name: businessname,
    business_owner: owner,
    rc_number: rcNumber,
    phone_number: phoneno,
    address: address,
    city: city,
    state: state,
    category: category,
    tag: tag,
    email: email,
    agent: {...agent},
    coords: {
      lat: latitude,
      lng: longitude
    },
    registered: registered
  })

  business
    .save()
    .then(result => {
      console.log('Registered Successfully.');
      res.status(200).json('Registration Complete')
    })
    .catch(err => {
      console.log(err.message);
      res.status(400).json(`Unable to register business.`)
    })
}
