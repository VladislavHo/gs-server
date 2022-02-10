const {Schema, model} = require("mongoose");


const UserDB = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
  },  
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  basket:{
    type: Array,
  }
});



module.exports = model('UserDB', UserDB);