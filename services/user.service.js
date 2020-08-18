const User = require('../models/user.model')

const Create = async (data) => {
    try{
        const user = await User.create(data)
        return user
    }catch (e) {
        console.log('error: ', e)
    }
}

const Find = async () => {
    try{
        const users = await User.find({})
        return users
    }catch (e) {
        console.log('error: ', e)
    }
}

const FindOne = async (query) => {
    try{
        const user = await User.findOne(query)
        return user
    }catch (e) {
        console.log('error: ', e)
    }
}

const FindOneAndUpdate = async (filter, data) => {
    try{
        const user = await User.findOneAndUpdate(filter, {
            ...data
        })
        return user
    }catch (e) {
        console.log('error: ', e)
    }
}

const DeleteOne = async (filter) => {
    try{
        const user = await User.deleteOne(filter)
        return user
    }catch (e) {
        console.log('error: ', e)
    }
}

const FIndOneAndPopulate = async (query, populate_fields) => {
    try{
        const user = await User.findOne(query).populate(populate_fields)
        const organizations = user.organizations
        return organizations

    }catch (e) {
        console.log('error: ', e)
    }
}

module.exports = {
    Create,
    Find,
    FindOne,
    FindOneAndUpdate,
    DeleteOne,
    FIndOneAndPopulate
}
