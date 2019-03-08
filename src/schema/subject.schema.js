import mongoose from "mongoose";
import {schemaClass} from "./class.schema";
const Schema = mongoose.Schema;
const Subject=new Schema({
    SubjectName: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    classId:  { type: mongoose.Types.ObjectId, ref: 'schemaClass' }
})
const schemaSubject=mongoose.model('SUBJECT',Subject);
module.exports ={schemaSubject};