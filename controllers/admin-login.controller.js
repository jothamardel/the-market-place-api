
exports.createAdmin = (req, res, knex) => {
  const { name, password } = req.body;
  knex('admin_login').insert({
    name: name,
    password: password
  })
  .returning('name')
  .then((data) => {
    res.status(200).json('Admin Created!')
  })
  .catch((error) => {
    res.status(400).json('Unable to create admin')
  });
}

exports.adminLogin = (req, res, knex) => {
  const { name, password } = req.body;
  console.log(typeof(name), typeof(password));
  knex.select('*').from('admin_login').where('name', '=', name)
  .then((data) => {
    if (data[0].password === password && data[0].name === name) {
      return res.status(200).json(data[0].name);
    }
    res.status(400).json('login credentials incorrect!')
  })
  .catch((error) => {
    res.status(400).json('unable to login!')
  })
}