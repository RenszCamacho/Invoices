const { model, Schema } = require('mongoose');

const userSchema = Schema({
  username: String,
  email: String,
  password: String,
  userAddress: {
    street: String,
    city: String,
    postCode: String,
    country: String
  },
  client: [{ type: Schema.Types.ObjectId, ref: 'Invoice' }]
});

module.exports = model('User', userSchema);