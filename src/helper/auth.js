const jwt = require('jsonwebtoken')

let key = process.env.JWT_KEY

const generateToken = (payload) =>{
    const verifyOpts = {
        expiresIn : '1y'
    }
    const token = jwt .sign(payload,key,verifyOpts)
    return token
}

const genRefreshToken = (payload) =>{
    const verifyOpts = {
        expiresIn: '24y'
    }
    const token = jwt.sign(payload, key, verifyOpts)
    return token
}

const decodeToken = (token) => {
  var decoded = jwt.verify(token, key);
  return decoded;
};

module.exports = {generateToken, genRefreshToken,  decodeToken }