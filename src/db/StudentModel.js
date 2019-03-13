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
            const findClass = await this.ClassModel.findById(classId);
           if(!findClass){        
             return 0;
           }
           const createStudent =  await this.model.create(newStudent) 
           const result=await createStudent.save();
           const token = await createStudent.generateAuthToken();
           const finalResult={result,token}
           return finalResult
           //res.status(200).send({createStudent,token});
         }catch(error){
           //res.status(400).send(e)
           throw error
         }
    }
    findByCredential=async (email,password)=>{
        const studentUser =await this.model.findOne({email});
        const token = await studentUser.generateAuthToken()
        
        
        const result={studentUser,token}
        return result
    }
    findToken=(decoded,token)=>{
      const decodeToken= this.model.findOne({_id:decoded._id,'tokens.token':token})
      console.log(decoded,'aaaaaaaaaaaa',token,'bbbb',decoded._id);
      return decodeToken;
    }
      
}

  


export default new StudentModel();