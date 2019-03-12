import BaseModel from "./BaseModel";
import Class from "../schema/class.schema";
import Student from "../schema/student.schema";
import generateAuthToken from "../lib/session"
import { hashPassword, comparePassword } from "../lib/crypto";
import ClassModel from "./classModel"

export  class StudentModel extends BaseModel {
    constructor(connection){
        super("STUDENT", connection);
        this.schema = Student;
        this.name = "STUDENT";
        this.model = this.connection.model(this.name, this.schema);
        this.ClassSchema=Class;
        this.ClassName="CLASSROOM"
        this.ClassModel = this.connection.model(this.ClassName, this.ClassSchema);
    }
    create = async (
        name,
        email,
        password,
        age,
        classId
    ) => {
        if (!this.model) {
            await this._getModel();
          }
        
        try{                            
            const newStudent = {
                name,
                email,
                password: await hashPassword(password),
                age,
                classId 
            };
            
           const createStudent =  await this.model.create(newStudent)
           console.log('createStudent',createStudent);
           const findClass = await this.ClassModel.findById(classId);
        //    if(!findClass){        
        //      res.status(404).send({errorMessage: "class not found"})
        //    }
           const result=await createStudent.save();
           const token = await createStudent.generateAuthToken();
           const finalResult={result,token,findClass}
           return finalResult
           //res.status(200).send({createStudent,token});
         }catch(error){
           //console.log(createStudent);
           //res.status(400).send(e)
           throw error
         }
    }
    findByCredential=async (email,password)=>{
        const studentUser =await this.model.findOne({email});
        const token = await studentUser.generateAuthToken()
        
        
        const result={studentUser,token}
        console.log('studenttt',result)
        return result
    }
      
}

  


export default new StudentModel();