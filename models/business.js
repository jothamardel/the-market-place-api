const mongoose =  require('mongoose');

const Schema =  mongoose.Schema;


const businessSchema = new Schema({
  business_name: {
    type: String,
    required: true,
    unique: true
  },
  business_owner: {
    type: String,
    required: true
  },
  rc_number: {
    type: Number
  },
  registered: {
    type: Boolean,
    default: null,
  },
  phone_number: {
    type: Number,
    required: true,
    unique: true
  },
  address: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  tag: {
    type: [String],
    required: true
  },
  email: {
    type: String,
  },
  agent: {
    type: {},
    required: true
  },
  coords: {
    lat: {
      type: Schema.Types.Decimal128,
      required: true
    },
    lng: {
      type: Schema.Types.Decimal128,
      required: true
    }
  }
})

businessSchema.index({
  unique: true,
  partialFilterExpression: { rc_number: { $type: "number" } }
})

businessSchema.index({
  unique: true,
  partialFilterExpression: { email: { $type: "string" } }
})


module.exports = mongoose.model('Business', businessSchema)
