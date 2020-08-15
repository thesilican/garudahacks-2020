const mongoose = require('mongoose');


const HospitalSchema = mongoose.Schema({
    email: {
        type: String,
        required : true
    },

    password: {
        type: String,
        required : true
    },

    hospital:{
        name: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        }
    },

    token: {
        type: String,
        required: true
    }
    
    
});

module.exports = mongoose.model('Hospital', HospitalSchema);