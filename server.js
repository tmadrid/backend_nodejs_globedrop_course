const express = require('express')
const bodyParser = require('body-parser')
const { db } = require('./db/index')

db()
const port = 3000
const app = express()
app.use(bodyParser.urlencoded({extend: true}))
app.use(bodyParser.json({}))
app.get("/", (req, res) =>{
    res.send('Hello STU')
})

//routes
const organization = require('./routes/organization.route')
app.use(organization)

app.listen(port, () => {
    console.log('Server running at: ', port)
});
