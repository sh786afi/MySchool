import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {schemaClass} from "./class.schema";
import { error } from "util";
const Schema = mongoose.Schema;
const Student=new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
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
                throw new Error('Age must be a positive number')
            }
        }
    },
    classId:  { type: Schema.Types.ObjectId, ref: 'schemaClass' },
    tokens: [{
        token:{
            type:String,
            required:true
        }
    }]
})

Student.methods.toJSON = function () {
    const user = this;
    const userObject=user.toObject();
    delete userObject.password;
    delete userObject.tokens;

    return userObject ;
}



// const schemaStudent=mongoose.model('STUDENT',Student);
//module.exports ={schemaStudent};
export default  Student;