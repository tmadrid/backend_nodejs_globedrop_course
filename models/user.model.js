const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const UserSchema = new mongoose.Schema({
        username: String,
        first_name: String,
        last_name: String,
        email: String,
        password: String,
        country: String,
        language: String,
        userType: {
            type: String,
            enum: ['user', 'ngo_admin', 'super_admin'],
            default: 'user'
        },
        organizations: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'organization'
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

UserSchema.pre('save', async function (next) {
    const user = this
    user.password = user.password && (await bcrypt.hash(user.password.trim(), 12))
    next()
})

UserSchema.pre('findOneAndUpdate', async function (next) {
    this.update({}, {$set: {updatedAt: new Date()}})
})

const User = mongoose.model(
    'user', // model
    UserSchema,
    'user' // collection
)

module.exports  = User
