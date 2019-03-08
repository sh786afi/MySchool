import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import {schemaClass} from "./class.schema";
const Schema = mongoose.Schema;
const Student=new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain "password"')
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be a postive number')
            }
        }
    },
    classId:  { type: Schema.Types.ObjectId, ref: 'schemaClass' }
})

Student.pre('save', async function (next){
    const updateStudent =this
    if(updateStudent.isModified('password')) {
        console.log('hello');
        updateStudent.password=await bcrypt.hash(updateStudent.password,8)
    }

    next()
})
const schemaStudent=mongoose.model('STUDENT',Student);
module.exports ={schemaStudent};