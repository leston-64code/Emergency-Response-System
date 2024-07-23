const mongoose = require('mongoose');


var incidentSchema = new mongoose.Schema({
    latitude: {
        type: Number,
        required: true
    },
    longitude: {
        type: Number,
        required: true
    },
    volunteerCount: {
        type: Number,
        required: true
    },
    volunteerArrived: {
        type: Number
    },
    volunteers: [
        {
            type: mongoose.Schema.Types.ObjectId
        }
    ],
    images: [
        {
            type: String
        }
    ],
    address:{
        city: {
            type: String
        },
        county: {
            type: String
        },
        state_district: {
            type: String
        },
        state: {
            type: String
        },
        postcode: {
            type: String
        },
        country: {
            type: String
        },
        country_code: {
            type: String
        }
    }
},
    {
        timestamps: true
    }
);

//Export the model
module.exports = mongoose.model('Incident', incidentSchema);