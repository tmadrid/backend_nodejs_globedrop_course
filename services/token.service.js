const Token = require('../models/token.model')

const Create = async (data) => {
    try{
        const token = await Token.create(data)
        return token
    }catch (e) {
        console.log('error: ', e)
    }
}

const FindOne = async (query) => {
    try{
        const token = await Token.findOne(query)
        return token
    }catch (e) {
        console.log('error: ', e)
    }
}

const FindOneAndUpdate = async (filter, data) => {
    try{
        const token = await Token.findOneAndUpdate(filter, {
            ...data
        })
        return token
    }catch (e) {
        console.log('error: ', e)
    }
}

const DeleteOne = async (filter) => {
    try{
        const token = await Token.deleteOne(filter)
        return token
    }catch (e) {
        console.log('error: ', e)
    }
}


module.exports = {
    Create,
    FindOne,
    FindOneAndUpdate,
    DeleteOne,
}
