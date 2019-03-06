import mongoose from "mongoose";
import {schemaClass} from "./class.schema";
var Schema = mongoose.Schema;
var schemaStudent=mongoose.model('STUDENT',new Schema({
    StudentName: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    RollNo:{
        type: Number,
        required:true
    },
    classId:  { type: Schema.Types.ObjectId, ref: 'schemaClass' }
}));
module.exports ={schemaStudent};