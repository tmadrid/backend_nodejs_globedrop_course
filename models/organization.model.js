const mongoose = require('mongoose')

const OrganizationSchema = new mongoose.Schema({
    org_name: String,
    org_description: String,
    country: String,
    city: String,
    picture: String,
    createdAt: { type: Date, default: Date.now },
    updateAt: { type: Date, default: Date.now }
})

const Organization = mongoose.model(
    'organization', // model
    OrganizationSchema,
    'organization' // collection
)

module.exports  = Organization
