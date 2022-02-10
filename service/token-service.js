const jwt = require('jsonwebtoken')
const TokenModel = require("../models/token-model")

class TokenService{
  generateToken(payload){
    const accessToken = jwt.sign(payload, process.env.TOKEN_JWT_KEY_ACCESS, {expiresIn: '30m'})
    const refreshToken = jwt.sign(payload, process.env.TOKEN_JWT_KEY_REFRESH, {expiresIn: '7d'})
    return {
      accessToken,
      refreshToken
    }
  }

  async saveTocken () {
    const tokenData = await TokenModel.findOne({user})
  }
}

module.exports = new TokenService()