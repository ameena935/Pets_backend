const mongoose = require("mongoose");

const petSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    age: {
        type: Number,
        required: true,
        min: 0,
        max: 30
    },
    species: {
        type: String,
        required: true,
        enum: ['dog', 'cat', 'bird', 'other']
    },
    adopted: {
        type: Boolean,
        default: false
    },
    arrivedOn: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps : true
});

module.exports = mongoose.model("Pet", petSchema)