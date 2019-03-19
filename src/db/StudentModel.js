import BaseModel from "./BaseModel";
import Class from "../schema/class.schema";
import Student from "../schema/student.schema";
import { hashPassword, comparePassword } from "../lib/crypto";
import ClassModel from "./classModel"

export class StudentModel extends BaseModel {
  constructor(connection) {
    super("STUDENT", connection);
    this.schema = Student;
    this.name = "STUDENT";
    this.model = this.connection.model(this.name, this.schema);
    this.ClassSchema = Class;
    this.ClassName = "CLASSROOM"
    this.ClassModel = this.connection.model(this.ClassName, this.ClassSchema);
  }
  createStudent = async (
    name,
    fatherName,
    email,
    age
  ) => {
    if (!this.model) {
      await this._getModel();
    }
    const newStudent = {
      name,
      fatherName,
      email,
      age
    };
    const addStudent = await this.model.create(newStudent)
    const result = await addStudent.save();
    return result
  }
  findAllStudent = async () => {
    try {
      const allStudent = await this.model.find({});
      return allStudent;
    } catch (error) {
      throw error
    }
  }
  findStudentById = async (id) => {
    const StudentById = await this.model.findById(id)
    return StudentById;
  }
  deleteStudentById = async (id) => {
    const removeStudentById = await this.model.findByIdAndRemove(id)
    return removeStudentById;
  }
  updateStudent=async (id,info)=>{
    const updateStudentById=await this.model.findByIdAndUpdate(id,info,{new:true});
    return updateStudentById
}


}



export default new StudentModel();