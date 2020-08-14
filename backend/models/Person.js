const mongoose = require('mongoose');


const PersonSchema = mongoose.Schema({
    name: {
        first: {
            type: String,
            required: true
        },

        last: {
            type: String,
            required: true
        }
    },

    locations: [mongoose.Schema.Types.Mixed]
    
    
});

module.exports = mongoose.model('Person', PersonSchema);