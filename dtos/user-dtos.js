module.exports = class UserDto{
  firstName;
  lastName;
  email;
  id;
  basket;
  constructor(model){
    this.firstName = model.firstName
    this.lastName = model.lastName
    this.id = model._id
    this.email = model.email
    this.basket = model.basket
  }
}