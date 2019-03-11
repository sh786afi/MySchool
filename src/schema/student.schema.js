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
                throw new Error('Age must be a postive number')
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
    const studentUsers = this
    const userObject=user.toObject();
    delete userObject.password;
    delete userObject.tokens;

    return userObject ;
}

Student.methods.generateAuthToken=async function () {
    const studentUsers = this
    const token = jwt.sign({_id: studentUsers._id.toString() },'thisismycourse',{expiresIn: '7 days'})
    studentUsers.tokens=studentUsers.tokens.concat({token})
    await studentUsers.save()
    return token;
}

Student.statics.findByCredential=async (email,password)=>{
    const studentUsers =await schemaStudent.findOne({email});
    if(!studentUsers){
        throw new Error('Unable to Login');
    }
    const isMatch = await bcrypt.compare(password,studentUsers.password);
    if(!isMatch){
        throw new Error('Unable to Login');
    }
    return studentUsers
}

Student.pre('save', async function (next){
    const updateStudent =this
    if(updateStudent.isModified('password')) {
        updateStudent.password=await bcrypt.hash(updateStudent.password,8)
    }

    next()
})
const schemaStudent=mongoose.model('STUDENT',Student);
module.exports ={schemaStudent};