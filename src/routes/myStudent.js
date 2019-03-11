import {schemaStudent} from "../schema/student.schema";
import {schemaClass} from "../schema/class.schema";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import {auth} from "../lib/auth"
var ObjectId=mongoose.Types.ObjectId;

//Signup Student
export const addStudent=async (req,res)=>{
    const _id = req.params.id;
    const createStudent =  new schemaStudent(req.body);
    try{
      console.log(createStudent);
      const findClass = await schemaClass.findById(req.body.classId);
      if(!findClass){        
        res.status(404).send({errorMessage: "class not found"})
      }
      await createStudent.save();
      const token = await createStudent.generateAuthToken()
      res.status(200).send({createStudent,token});
    }catch(e){
      //console.log(createStudent);
      res.status(400).send(e)
    }
};
//Login Student
export const loginStudent = async (req,res)=>{
  try{
    const studentUser = await schemaStudent.findByCredential(req.body.email, req.body.password);
    const token = await studentUser.generateAuthToken()
    res.send({ studentUser,token });
  }catch(e){
    res.status(400).send();
  }
}
//Get Student profile
export const studentProfile = async(req,res)=>{
      res.send(req.user);
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
    const findClass = await schemaClass.findById(req.body.classId);
    if(!updateStudent){
      return res.status(404).send()
    }
    else if(!findClass){
      return res.status(404).send({errorMessage: "class not found"})
    }
    await updateStudent.save();
    res.send(updateStudent);
  }catch(e){
    res.status(400).send(e);
  }
}; 
//pending
export const getAllSubjectOfStudent = async(req,res)=>{
    try{
      const classId=req.params.classId;
       const StudentByClassId=await schemaStudent.find({'classId':classId});
      if(!StudentByClassId){
        return res.status(400).send()
      }
      res.send(StudentByClassId);
    }catch(e){
      console.log(e);
      
      //console.log(modelClass);
      res.status(500).send(e);
    }
 }; 

 export const logoutStudent = async (req, res)=>{
   try{
    req.user.tokens=req.user.tokens.filter((token)=>{

      return token.token != req.token;
    })
    await req.user.save()
    res.send()
   }catch(e){
    res.status(500).send()
   }
 };

 export const logoutAllStudent = async (req,res)=>{
   try{
    req.user.tokens=[];
    await req.user.save();
    res.send()
   }catch(e){
    res.status(500).send()
   }
 };
