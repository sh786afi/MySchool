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
console.log('outttttttt');
Student.pre('save', async function (next){
    console.log('innnnnnnnn');
    const updateStudent =this
    console.log('updateeeee var',updateStudent);
    console.log('issssss',updateStudent.isModified('password'))
    if(updateStudent.isModified('password')){
        console.log('modifiyyyy',isModified);
        updateStudent.password=await bcrypt.hash(user.password,8)
    }
    next()
})
const schemaStudent=mongoose.model('STUDENT',Student);
module.exports ={schemaStudent};