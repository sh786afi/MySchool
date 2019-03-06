import mongoose from "mongoose";
var schemaClass=mongoose.model('ClassRoom',new mongoose.Schema({
    ClassName: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    CapacityOfStudent:  {
        type: Number,
        required: true
        
    }
}));

module.exports = {schemaClass};