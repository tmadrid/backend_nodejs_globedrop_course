const mongoose = require('mongoose')

const OrganizationSchema = new mongoose.Schema({
        org_name: String,
        org_description: String,
        country: String,
        city: String,
        picture: String,
        admins: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'user'
            }
        ],
        createdAt: {
            type: Date,
            default: Date.now
        },
        updatedAt: {
            type: Date,
            default: Date.now
        }
    },
    {
        versionKey: false
    })


OrganizationSchema.pre('findOneAndUpdate', async function (next) {
    this.update({}, {$set: {updatedAt: new Date()}})
})

const Organization = mongoose.model(
    'organization', // model
    OrganizationSchema,
    'organization' // collection
)

module.exports  = Organization
