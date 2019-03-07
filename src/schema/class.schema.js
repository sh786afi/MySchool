import mongoose from "mongoose";

const Class =new mongoose.Schema({
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
})
const schemaClass=mongoose.model('ClassRoom',Class);

module.exports = {schemaClass};