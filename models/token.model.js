const mongoose = require('mongoose')

const TokenSchema = new mongoose.Schema({
        access_token: String,
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


TokenSchema.pre('findOneAndUpdate', async function (next) {
    this.update({}, {$set: {updatedAt: new Date()}})
})

const Token = mongoose.model(
    'token', // model
    TokenSchema,
    'token' // collection
)

module.exports  = Token
