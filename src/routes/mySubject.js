import {schemaSubject} from "../schema/subject.schema";
import {schemaClass} from "../schema/class.schema";
import {ObjctId} from "mongoose"
export const addSubject=async(req,res)=>{
    const _id = req.params.id;
    const createSubject =  new schemaSubject(req.body);
    //console.log('abcccc',req.body);
    try{
      console.log(createSubject);
      const findClass = await schemaClass.findById(req.body.classId);
      if(!findClass){        
        res.status(404).send({errorMessage: "class not found"});
      }
      await createSubject.save();
      res.status(200).send({createSubject});
    }catch(e){
      //console.log(createSubject);
      res.status(400).send(e)
    }
};
//Get all Subject api
export const getSubject = async(req,res)=>{
    try{
      const allSubjects=await schemaSubject.find({});
      res.send(allSubjects);
    }catch(e){
      //console.log(modelClass);
      res.status(500).send(e);
    }
}; 
//Get Subject By id
  export const getSubjectbyId = async(req,res)=>{
    const _id = req.params.id;
    try{
      const SubjectById=await schemaSubject.findById(_id);
      if(!SubjectById){
        return res.status(400).send()
      }
      res.send(SubjectById);
    }catch(e){
      //console.log(modelClass);
      res.status(500).send(e);
    }
 }; 
 export const deleteSubjectbyId = async(req,res)=>{
  const _id = req.params.id;
  try{
    const deleteSubjectById=await schemaSubject.findByIdAndRemove(_id);
    if(!deleteSubjectById){
      return res.status(400).send()
    }
    res.send(deleteSubjectById);
  }catch(e){
    //console.log(modelClass);
    res.status(500).send(e);
  }
}; 
export const updateSubjectbyId = async(req,res)=>{
  const _id = req.params.id;
  try{
    const updateSubjectById=await schemaSubject.findByIdAndUpdate(_id,req.body,{new:true});
    if(!updateSubjectById){
      return res.status(404).send()
    }
    res.send(updateSubjectById);
  }catch(e){
    //console.log(modelClass);
    res.status(400).send(e);
  }
}; 
// pendßing
export const getAllSubjectInClass = async(req,res)=>{
    const classId = req.params.classId;
    console.log('iddddd',classId);
    try{
      const SubjectByClassId=await schemaSubject.findOne({classId:classId});
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
