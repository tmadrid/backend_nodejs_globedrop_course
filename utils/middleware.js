const { jwtVerify } = require('./helper')


const isAuthenticated = async (req, res, next) => {
        const authorization = req.headers.authorization
        const token = authorization && authorization.startsWith('Bearer') && authorization.slice(7, authorization.length)

        if(token){
            try {
                req.decoded = await jwtVerify(token)
                return next()
            }catch (e) {
                return res.status(400).json({
                    message: 'Invalid token'
                })
            }

        }
        return res.status(400).json({
            message: 'Auth token is not supplied'
        })
}

module.exports = {
    isAuthenticated
}
