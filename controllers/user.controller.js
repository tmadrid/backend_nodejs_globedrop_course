const UserService = require('../services/user.service')
const TokenService = require('../services/token.service')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const RegisterUser = async (req, res) => {
    try {
        const {
            username,
            first_name,
            last_name,
            email,
            password,
            language,
            country,
            userType,
            organizations
        } = req.body

        const existing_username = await UserService.FindOne({
            username
        })

        const existing_email = await UserService.FindOne({
            email
        })

        if(existing_username){
            return  res.status(409).json({
                message: 'Username exists'
            })
        }

        if(existing_email){
            return  res.status(409).json({
                message: 'Email exists'
            })
        }

        const new_user = await  UserService.Create({
            username,
            first_name,
            last_name,
            email,
            password,
            language,
            country,
            userType,
            organizations
        })

        return res.status(200).json({
            message: 'New user inserted',
            data: new_user,
        })

    }catch (e) {
        console.log('error: ', e)
    }
}

const GetAllUsers = async (req, res) => {
    try {
        const users = await UserService.Find()
        return res.status(200).json({
            message: 'All users',
            data: users,
        })
    }catch (e) {
        console.log('error: ', e)
    }
}

const GetUserById = async (req, res) => {
    try {
        const {_id} = req.params
        const user = await UserService.FindOne({
            _id
        })

        if (!user){
            return res.status(404).json({
                message: 'User does not exist'
            })
        }

        return res.status(200).json(
            {
                message: 'User fetched',
                data: user,
            }
        )
    }catch (e) {
        console.log('error: ', e)
    }
}

const GetUserByType = async (req, res) => {
    try {
        const { user_type } = req.params
        const users = await UserService.Find({
            userType: user_type
        })

        return res.status(200).json(
            {
                message: 'Users fetched',
                data: users,
            }
        )
    }catch (e) {
        console.log('error: ', e)
    }
}

const UpdateUser = async (req, res) => {
    try {
        const { _id } = req.params
        const {
            username,
            first_name,
            last_name,
            email,
            password,
            language,
            userType,
            organizations
        } = req.body

        const user = await UserService.FindOne({
            _id
        })

        if (!user){
            return res.status(404).json({
                message: 'User does not exist'
            })
        }

        const updated_user = await UserService.FindOneAndUpdate(
            {_id},
            {
                username,
                first_name,
                last_name,
                email,
                password,
                language,
                userType,
                organizations
            }
        )

        return res.status(200).json(
            {
                message: 'User updated',
                data: updated_user,
            }
        )

    }catch (e) {
        console.log('error: ', e)
    }
}

const DeleteUser = async (req, res) => {
    try {
        const {_id} = req.params

        const user = await UserService.FindOne({
            _id
        })

        if (!user){
            return res.status(404).json({
                message: 'User does not exist'
            })
        }

        await UserService.DeleteOne({
            _id
        })
        return res.status(200).json(
            {
                message: 'User deleted',
            }
        )
    }catch (e) {
        console.log('error: ', e)
    }
}

const GetOrganizationsByUser = async (req, res) => {
    const { user_id } = req.params
    try {
        const organizations = await UserService.FIndOneAndPopulate(
            {_id: user_id},
            "organizations"
        )
        return res.status(200).json(
            {
                message: 'Organizations fetched',
                data: organizations
            }
        )
    }catch (e) {
        console.log('error: ', e)
    }
}

const Login = async (req, res) => {
    try {
        const {
            email,
            password
        } = req.body
        const user = await  UserService.FindOne({email})

        if(!user){
            return res.status(400).json({
                message: 'Invalid email or password'
            })
        }

        const valid = user.password && (await bcrypt.compare(password, user.password))

        if(!valid){
            return res.status(400).json({
                message: 'Invalid email or password'
            })
        }

        const access_token = jwt.sign(user.toJSON(), 'secret_key', {
            expiresIn: '24h'
        })

        await TokenService.Create({access_token})
        return res.status(200).json(
            {
                message: 'User authenticated',
                access_token,
            }
        )

    }catch (e) {
        console.log('error: ', e)
    }
}

const Logout = async (req, res) => {
    try {
        const authorization = req.headers.authorization
        const token = authorization && authorization.startsWith('Bearer') && authorization.slice(7, authorization.length)
        await Promise.all([TokenService.DeleteOne({access_token:token})])
        return res.status(200).json(
            {
                message: 'User Logged out',
            }
        )
    }catch (e) {
        console.log('error: ', e)
    }
}
module.exports = {
    RegisterUser,
    GetAllUsers,
    GetUserById,
    GetUserByType,
    UpdateUser,
    DeleteUser,
    GetOrganizationsByUser,
    Login,
    Logout
}
