import BaseModel from "./BaseModel";
import Student from "../schema/student.schema";

export  class StudentModel extends BaseModel {
    constructor(connection){
        super("STUDENT", connection);
        this.schema = Student;
        this.name = "STUDENT";
        this.model = this.connection.model(this.name, this.schema);
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
                password,
                age,
                classId 
            };
            
           const createStudent =  await this.model
           .create(newStudent)
           console.log(createStudent);
           const findClass = await this.model.findById(req.body.classId);
           if(!findClass){        
             res.status(404).send({errorMessage: "class not found"})
           }
           await createStudent.save();
           const token = await createStudent.generateAuthToken();
           res.status(200).send({createStudent,token});
         }catch(e){
           //console.log(createStudent);
           res.status(400).send(e)
         }
    }
      
}

  


export default new StudentModel();