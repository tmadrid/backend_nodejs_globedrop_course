const Organization = require('../models/organization.model')

const Create = async (data) => {
    try{
        const organization = await Organization.create(data)
        return organization
    }catch (e) {
        console.log('error: ', e)
    }
}

const Find = async () => {
    try{
        const organizations = await Organization.find({})
        return organizations
    }catch (e) {
        console.log('error: ', e)
    }
}

const FindOne = async (query) => {
    try{
        const organization = await Organization.findOne(query)
        return organization
    }catch (e) {
        console.log('error: ', e)
    }
}

const FindOneAndUpdate = async (filter, data) => {
    try{
        const organization = await Organization.findOneAndUpdate(filter, {
            ...data
        })
        return organization
    }catch (e) {
        console.log('error: ', e)
    }
}

const DeleteOne = async (filter) => {
    try{
        const organization = await Organization.deleteOne(filter)
        return organization
    }catch (e) {
        console.log('error: ', e)
    }
}

const FIndOneAndPopulate = async (query, populate_fields) => {
    try{
        const organization = await Organization.findOne(query).populate(populate_fields)
        const admins = organization.admins
        return admins

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
