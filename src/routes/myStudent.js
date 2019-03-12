import { route, successRoute } from "./";
import {comparePassword} from "../lib/crypto"
// import {schemaStudent} from "../schema/student.schema";
// import {schemaClass} from "../schema/class.schema";
import StudentModel from "../db/StudentModel";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import {auth} from "../lib/auth"

//Signup Student
export const addStudent= route(
  async (req,res)=>{
    const {
      name,
      email,
      password,
      age,
      classId
    } = req.body;
    const newStudent = await StudentModel.create(
      name,
      email,
      password,
      age,
      classId
    );
    console.log('newStudenttttt',newStudent)
    if(!newStudent.findClass){
      res.status(404).send({error:'class not found'})
    }
    res.send(await successRoute(newStudent));
  }
);

// Login Student
export const loginStudent = route(async (req,res)=>{
  try{
    const studentUser = await StudentModel.findByCredential(req.body.email, req.body.password);
    console.log('studdeLogg',studentUser)
    const isMatch = await comparePassword(req.body.password,studentUser.studentUser.password);
    if(!isMatch){
      res.status(404).send({error:'Incorrect password'})
      }
  res.send(await successRoute(studentUser));
  }catch(e){
    res.status(400).send({error:'email or password is incorrect'});
  }
});
//Get Student profile
export const studentProfile = route(async(req,res)=>{
  res.send(await successRoute(req.user));
}); 
//Get Subject By id
//   export const getStudentbyId = async(req,res)=>{
//     const _id = req.params.id;
//     try{
//       const StudentById=await schemaStudent.findById(_id);
//       if(!StudentById){
//         return res.status(400).send()
//       }
//       res.send(StudentById);
//     }catch(e){
//       //console.log(modelClass);
//       res.status(500).send(e);
//     }
//  }; 
//  export const deleteStudentbyId = async(req,res)=>{
//   const _id = req.params.id;
//   try{
//     const deleteStudentById=await schemaStudent.findByIdAndRemove(_id);
//     if(!deleteStudentById){
//       return res.status(400).send()
//     }
//     res.send(deleteStudentById);
//   }catch(e){
//     //console.log(deleteStudentById);
//     res.status(500).send(e);
//   }
// }; 
// export const updateStudentbyId = async(req,res)=>{
//   const update=Object.keys(req.body);
//   const allowedUpdates=['name','email','password','age','classId']
//   const isValidOperation=update.entries((update)=>allowedUpdates.includes(update))
//   if(!isValidOperation){
//     return res.status.send({error:'Invalid Updates'})
//   }
//   try{
//     //const updateStudent=await schemaStudent.findByIdAndUpdate(_id,req.body,{new:true, runValidators: true});
//     const updateStudent =await schemaStudent.findById(req.params.id);
//     update.forEach((update) =>updateStudent[update]=req.body[update]);
//     const findClass = await schemaClass.findById(req.body.classId);
//     if(!updateStudent){
//       return res.status(404).send()
//     }
//     else if(!findClass){
//       return res.status(404).send({errorMessage: "class not found"})
//     }
//     await updateStudent.save();
//     res.send(updateStudent);
//   }catch(e){
//     res.status(400).send(e);
//   }
// }; 
// //pending
// export const getAllSubjectOfStudent = async(req,res)=>{
//     try{
//       const classId=req.params.classId;
//        const StudentByClassId=await schemaStudent.find({'classId':classId});
//       if(!StudentByClassId){
//         return res.status(400).send()
//       }
//       res.send(StudentByClassId);
//     }catch(e){
//       console.log(e);
      
//       //console.log(modelClass);
//       res.status(500).send(e);
//     }
//  }; 

//  export const logoutStudent = async (req, res)=>{
//    try{
//     req.user.tokens=req.user.tokens.filter((token)=>{

//       return token.token != req.token;
//     })
//     await req.user.save()
//     res.send()
//    }catch(e){
//     res.status(500).send()
//    }
//  };

//  export const logoutAllStudent = async (req,res)=>{
//    try{
//     req.user.tokens=[];
//     await req.user.save();
//     res.send()
//    }catch(e){
//     res.status(500).send()
//    }
//  };
