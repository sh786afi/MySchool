import mongoose from "mongoose";
import {schemaClass} from "./class.schema";
var Schema = mongoose.Schema;
var schemaSubject=mongoose.model('SUBJECT',new Schema({
    SubjectName: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    classId:  { type: Schema.Types.ObjectId, ref: 'schemaClass' }
}));
module.exports ={schemaSubject};