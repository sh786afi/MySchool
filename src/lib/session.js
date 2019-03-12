import Student from "../schema/student.schema"
import {configurationFile} from "./config"
import jwt from "jsonwebtoken"

Student.methods.generateAuthToken=async function () {
    const studentUsers = this
    const token = jwt.sign({_id: studentUsers._id.toString() },configurationFile.development.JWT_SECRET,{expiresIn: '7 days'})
    studentUsers.tokens=studentUsers.tokens.concat({token})
    await studentUsers.save()
    return token;
}