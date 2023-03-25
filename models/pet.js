const mongoose = require('mongoose')
const petSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'pet name required']
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Owner',
    }
})

const Pet = mongoose.model('Pet', petSchema)

module.exports = Pet