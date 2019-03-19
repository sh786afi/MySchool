import mongoose from "mongoose";
import validator from "validator";
const Schema = mongoose.Schema;
const Student=new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    fatherName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique:true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
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
    }
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