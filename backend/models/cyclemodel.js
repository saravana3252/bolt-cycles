const mongoose = require("mongoose");

let cyclesSchema = mongoose.Schema({
    id:{
        type:Number,
        required:true
    },
    name: {
        type: String,
        required: true // Marks the field as required
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    imageurl: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    rating: {
        type: Number,
        default: 0 // Default value if not provided
    },
    reviews: {
        type: [String], // Array of review strings
        default: [] // Default to an empty array
    }
},{timestamps:true});   

// Create the Mongoose model
let cyclesModel = mongoose.model("cycles", cyclesSchema);

module.exports = cyclesModel;



