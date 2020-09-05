const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const createUserSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  mobile: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    unique: true
  },
  city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  password: {
    type: Number,
    required: true
  }
});



createUserSchema.index({
  unique: true,
  partialFilterExpression: { email: { $type: "string" } }
})


module.exports = mongoose.model('BusinessOwner', createUserSchema);