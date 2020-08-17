const mongoose = require('mongoose')

const database_connection = 'mongodb+srv://admin:P%40ssword01@cluster0.tehnc.mongodb.net/globedrop_nodejs_course?retryWrites=true&w=majority'

const db = () =>{
    try {
        mongoose.connect(database_connection, {
            useNewUrlParser: true
        })
    }catch (e) {
        console.log('error: ', e)
    }

}

module.exports ={
    db
}
