const mongoose = require('mongoose');

const ResetSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    datetime: {
        type: Date,
        required: true,
        default: Date.now
    },
    pin: {
        type: Number,
        required: true
    }

});


module.exports = mongoose.model('Rest', ResetSchema);
