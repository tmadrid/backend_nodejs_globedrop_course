const jwt = require('jsonwebtoken')

const jwtVerify = (token) =>
    new Promise((resolve, reject) => {
        jwt.verify(token, 'secret_key', (error, decoded) => {
            if(error){
                reject(new Error(error))
            }
            resolve(decoded)
        })
    })

module.exports = {
    jwtVerify
}
