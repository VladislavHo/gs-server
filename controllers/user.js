const UserDB = require("../models/user-model")
const bcrypt = require('bcryptjs');
const TokenService = require('../service/token-service');
const UserDto = require("../dtos/user-dtos");
const { db } = require("../models/user-model");


class User{
  async registration(req, res) {
    try{
        const {user} = req.body
        const {email, password} = user

        const candidate = await UserDB.findOne({email})
        if(candidate) {
          res.status(400).json({message: email + ' уже существует!'})
        }

        const hashPassword = bcrypt.hashSync(password, 6);
        const newActiveUser = new UserDB({...user, password: hashPassword})
        await newActiveUser.save()


        // res.cookie('refreshToken', TokenService.generateToken({...newActiveUser._id}).refreshToken)
        return res.status(200).send(newActiveUser)

    } catch (error) {
      res.status(400).json({message: error.message})
    }

  }
  async login(req, res) {
    try {
        const {email, password} = req.body.user

        const user = await UserDB.findOne({email})
        if(!user) {
          res.status(400).json({message: `пользавтель ${email} не найден!`})
        }
       
        const validPassword =  bcrypt.compareSync(password, user.password)

        if(!validPassword) {
          res.status(400).json({message: 'Неверный пароль'})
        }
         

        const userDto = new UserDto(user)

        return res.status(200).json({...userDto})

    } catch (error) {
       res.status(400).json({message: error.message})
    }
  }
 async updataBasket(req, res){
   try {
    const {email, game} = req.body
    const userDB = await UserDB.findOne({email}).updateOne({$addToSet :{basket: game}})
    


    if(!userDB) {
      res.status(400).json({message: `${email} не найден, необходимо зарегистрироваться`})
    }

    const user = await UserDB.findOne({email})
   

    return res.status(200).json(user.basket)
   } catch (error) {
     console.log(error.message)
   }
  }

  async removeBasket(req, res) {
    try {
      const {email, game} = req.body


      const userDB = await UserDB.findOne({email}).updateOne({$pull :{basket: game}})

      if(!userDB) {
        res.status(400).json({message: `${email} не найден, необходимо зарегистрироваться`})
      }

      const user = await UserDB.findOne({email})
   

      return res.status(200).json(user.basket)
    } catch (error) {
      console.log(error.message)
    }
  }
}

module.exports = new User()