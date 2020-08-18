const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: String,
    first_name: String,
    last_name: String,
    email: String,
    password: String,
    language: String,
    userType: String,
    createdAt: { type: Date, default: Date.now },
    updateAt: { type: Date, default: Date.now }
})

const User = mongoose.model(
    'user', // model
    UserSchema,
    'user' // collection
)

module.exports  = User
