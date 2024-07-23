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
    ]
},
    {
        timestamps: true
    }
);

//Export the model
module.exports = mongoose.model('Incident', incidentSchema);