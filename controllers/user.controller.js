const UserService = require('../services/user.service')

const AddUser = async (req, res) => {
    try {
        const {
            username,
            first_name,
            last_name,
            email,
            password,
            language,
            userType
        } = req.body

        const existing_user = await UserService.FindOne({
            username
        })

        if(existing_user){
            return  res.status(409).json({
                message: 'Data exists'
            })
        }

        const new_user = await  UserService.Create({
            username,
            first_name,
            last_name,
            email,
            password,
            language,
            userType
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
            message: 'All organizations',
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
            userType
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
                userType
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

module.exports = {
    AddUser,
    GetAllUsers,
    GetUserById,
    UpdateUser,
    DeleteUser
}
