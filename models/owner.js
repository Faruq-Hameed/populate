const mongoose = require('mongoose')

const ownerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'owner name is required']
    },
    pets: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pet'
    }]
})

module.exports = mongoose.model('Owner', ownerSchema);

