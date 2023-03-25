const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const ownerRouter = require('./routes/owner');
const petRouter = require('./routes/pets');


const app = express()
const URI = `mongodb+srv://${process.env.URI_USERNAME}:${process.env.URI_PASSWORD}@cluster0.kci2qpn.mongodb.net/pet_app2?retryWrites=true&w=majority`

mongoose.connect(URI)
    .then(() => {
        console.log('connected to db successfully')
    })
    .catch(err => console.error(err.message))

app.use(express.json())
app.use('/owners', ownerRouter)
app.use('/pets', petRouter)


app.listen(5090, () => {
    console.log('server listening on port 5090')
})

