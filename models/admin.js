const mongoose = require('mongoose');

const adminSchema = new mongoose.schema(
    {
        name: {
            type: String,
            require: true
        },
        password:{
            type: String,
            require: true
        }
    }
);

module.exports = mongoose.modle('Admin', adminSchema);