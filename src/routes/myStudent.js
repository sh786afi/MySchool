import {schemaStudent} from "../schema/student.schema";
import {schemaClass} from "../schema/class.schema";
import {ObjctId} from "mongoose"
export const addStudent=async(req,res)=>{
    const _id = req.params.id;
    const createStudent =  new schemaStudent(req.body);
    //console.log('abcccc',req.body);
    try{
      console.log(createStudent);
      const findClass = await schemaClass.findById(req.body.classId);
      if(!findClass){        
        res.status(404).send({errorMessage: "class not found"})
      }
      await createStudent.save();
      res.status(200).send({createStudent});
    }catch(e){
      //console.log(createStudent);
      res.status(400).send(e)
    }
};
//Get all Subject api
export const getStudent = async(req,res)=>{
    try{
      const allStudents=await schemaStudent.find({});
      res.send(allStudents);
    }catch(e){
      //console.log(allStudents);
      res.status(500).send(e);
    }
}; 
//Get Subject By id
  export const getStudentbyId = async(req,res)=>{
    const _id = req.params.id;
    try{
      const StudentById=await schemaStudent.findById(_id);
      if(!StudentById){
        return res.status(400).send()
      }
      res.send(StudentById);
    }catch(e){
      //console.log(modelClass);
      res.status(500).send(e);
    }
 }; 
 export const deleteStudentbyId = async(req,res)=>{
  const _id = req.params.id;
  try{
    const deleteStudentById=await schemaStudent.findByIdAndRemove(_id);
    if(!deleteStudentById){
      return res.status(400).send()
    }
    res.send(deleteStudentById);
  }catch(e){
    //console.log(deleteStudentById);
    res.status(500).send(e);
  }
}; 
export const updateStudentbyId = async(req,res)=>{
  const update=Object.keys(req.body);
  const allowedUpdates=['name','email','password','age','classId']
  const isValidOperation=update.entries((update)=>allowedUpdates.includes(update))
  if(!isValidOperation){
    return res.status.send({error:'Invalid Updates'})
  }
  try{
    //const updateStudent=await schemaStudent.findByIdAndUpdate(_id,req.body,{new:true, runValidators: true});
    const updateStudent =await schemaStudent.findById(req.params.id);
    update.forEach((update) =>updateStudent[update]=req.body[update]);
    await updateStudent.save();
    const findClass = await schemaClass.findById(req.body.classId);
    if(!updateStudent){
      return res.status(404).send()
    }
    else if(!findClass){
      return res.status(404).send({errorMessage: "class not found"})
    }
    res.send(updateStudent);
  }catch(e){
    //console.log(modelClass);
    res.status(400).send(e);
  }
}; 
//pending
export const getAllSubjectOfStudent = async(req,res)=>{
    const classId = req.params.classId;
    console.log('iddddd',classId);
    try{
      const SubjectByClassId=await subjectModel.findOne({classId:classId});
      console.log('subbiddddd',SubjectByClassId);
      if(!SubjectByClassId){
        return res.status(400).send()
      }
      res.send(SubjectByClassId);
    }catch(e){
      //console.log(modelClass);
      res.status(500).send(e);
    }
 }; 
