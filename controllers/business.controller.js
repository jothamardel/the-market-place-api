const { knex } = require("../app");

exports.getAllBusiness = (req, res, knex) => {
  knex.select('*').from('business_details').then((data) => {
    res.status(200).json(data);
  }).catch((error) => {
    res.staus(400).json('unable to retrieve.');
  })
}

exports.getAllBusinessAddress = (req, res, knex) => {
  knex.select('*').from('address_details').then((data) => {
    res.status(200).json(data);
  }).catch((error) => {
    res.staus(400).json('unable to retrieve.');
  })
}

exports.getBusiness = (req, res, knex) => {
  knex.select('*').from('business_details').where('phoneno', '=', req.params.id).then(data => {
    res.status(200).json(data);
  }).catch((error) => {
    res.staus(400).json('unable to retrieve!')
  })
};

exports.getBusinessAddress = (req, res, knex) => {
  knex.select('*').from('address_details').where('phoneno', '=', req.params.id).then(data => {
    res.status(200).json(data);
  }).catch((error) => {
    res.staus(400).json('unable to retrieve!')
  })
};

exports.getBusinessLocation = (req, res, knex) => {
  knex.select('*').from('coordinate_details').where('phoneno', '=', req.params.id).then(data => {
    res.status(200).json(data);
  }).catch((error) => {
    res.staus(400).json('unable to retrieve!')
  })
}

exports.getBusinessOwner = (req, res, knex) => {
  knex.select('*').from('owner_details').where('phoneno', '=', req.params.id).then(data => {
    res.status(200).json(data);
  }).catch((error) => {
    res.staus(400).json('unable to retrieve!')
  })
}

exports.getBusinessTag = (req, res, knex) => {
  knex.select('*').from('tag_details').where('phoneno', '=', req.params.id).then(data => {
    res.status(200).json(data);
  }).catch((error) => {
    res.staus(400).json('unable to retrieve!')
  })
} 

exports.registerBusiness = (req, res, knex) => {
  const {
    owner,
    businessname,
    phoneno,
    email,
    category,
    latitude,
    longitude,
    registered,
    rcNumber,
    city,
    state,
    address,
    tag
  } = req.body;
  knex.transaction(function(trx) {
    knex('owner_details').transacting(trx).insert({
      name: owner,
      email: email,
      phoneno: phoneno
    })
      .then((resp) => {
        knex('business_details').insert({
          name: businessname,
          phoneno: phoneno,
          registered: registered,
          rc_number: rcNumber
        }).catch(error => console.log(error, 'Business error'))
        knex('coordinate_details').insert({
          lat: latitude,
          lng: longitude,
          phoneno: phoneno
        }).catch(error => console.log(error, 'Coordinate error'))
        knex('address_details').insert({
          city: city,
          state: state,
          address: address,
          phoneno: phoneno
        }).catch(error => console.log(error, 'Address error'))
        knex('tag_details').insert({
          tag: `{${tag}}`,
          phoneno: phoneno,
          category: category
        }).catch(error => console.log(error, 'Tag error'))
      })
      .then(trx.commit)
      .catch(trx.rollback);
  })
  .then((resp) => {
    // console.log('Transaction complete.');
    res.status(200).json('Registration Complete')
  })
  .catch((err) => {
    console.error(err);
    res.status(400).json('Unable to resgister business.')
  });
}

exports.updateBusiness = (req, res, knex) => {
  const { businessname, phoneno, registered, rcNumber } = req.body;
  knex.select('*').from('business_details').where('phoneno', '=', req.params.id)
  .update({
    businessname: businessname,
    phoneno: phoneno,
    registered: registered,
    rc_number: rcNumber
  })
  .then(data => {
    res.status(200).json('Business details updated successfully!');
  }).catch((error) => {
    res.staus(400).json('Unable to update business details!')
  });
};

exports.updateBusinessCoordinates = (req, res, knex) => {
  const { lat, lng } = req.body;
  knex.select('*').from('coordinate_details').where('phoneno', '=', req.params.id)
  .update({
    lat: lng,
    lng: lng
  })
  .then(data => {
    res.status(200).json('Coordinates updated successfully!');
  }).catch((error) => {
    res.staus(400).json('Unable to update coordinates!')
  });
}

exports.updateBusinessOwner = (req, res, knex) => {
  const { name, email } = req.body;
  knex.select('*').from('owner_details').where('phoneno', '=', req.params.id)
  .update({
    name: name,
    email: email
  })
  .then(data => {
    res.status(200).json('Owner details updated successfully!');
  }).catch((error) => {
    res.staus(400).json('Unable to update owner details!')
  });
}

exports.updateBusinessTag = (req, res, knex) => {
  const { tag, category } = req.body;
  knex.select('*').from('tag_details').where('phoneno', '=', req.params.id)
  .update({
    tag: tag,
    category: category
  })
  .then(data => {
    res.status(200).json('Business details updated successfully!');
  }).catch((error) => {
    res.staus(400).json('Unable to update tag details!')
  });
} 

exports.updateBusinessAddress = (req, res, knex) => {
  const { address, city, state } = req.body;
  console.log(address, city, state)
  knex.select('*').from('address_details').where('phoneno', '=', req.params.id)
  .then(data)
  .update({
    ...data,
    address: address,
    city: city,
    state: state
  })
  .then(data => {
    res.status(200).json('Business details updated successfully!');
  }).catch((error) => {
    console.log(error)
    res.staus(400).json('Unable to update address details!')
  });
} 
