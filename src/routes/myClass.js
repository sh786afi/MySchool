// import {schemaClass} from "../schema/class.schema";
// import {bodyParser} from "body-parser";
// import { userInfo } from "os";
// import {express} from "express";

// //Add a new Class API
// export const addClass = async (req, res) => {
//   const createClass =  new schemaClass(req.body);
//   // console.log('abcccc',req.body);
//   try{
//     console.log(createClass);
//     await createClass.save();
//     res.status(200).send({createClass});
//   }catch(e){
//     console.log(createClass);
//     res.status(400).send(e)
//   }
//     };
// //Get all Class api
// export const getClass = async(req,res)=>{
//     try{
//       const allClasses=await schemaClass.find({});
//       res.send(allClasses);
//     }catch(e){
//       //console.log(schemaClass);
//       res.status(500).send(e);
//     }
// }; 
//   export const getClassbyId = async(req,res)=>{
//     const _id = req.params.id;
//     try{
//       const classById=await schemaClass.findById(_id);
//       if(!classById){
//         return res.status(400).send()
//       }
//       res.send(classById);
//     }catch(e){
//       //console.log(schemaClass);
//       res.status(500).send(e);
//     }
//  }; 
//  export const deleteClassbyId = async(req,res)=>{
//   const _id = req.params.id;
//   try{
//     const deleteClassById=await schemaClass.findByIdAndRemove(_id);
//     if(!deleteClassById){
//       return res.status(400).send() 
//     }
//     res.send(deleteClassById);
//   }catch(e){
//     //console.log(schemaClass);
//     res.status(500).send(e);
//   }
// }; 
// export const updateClassbyId = async(req,res)=>{
//   const _id = req.params.id;
//   try{
//     const updateClassById=await schemaClass.findByIdAndUpdate(_id,req.body,{new:true});
//     if(!updateClassById){
//       return res.status(404).send()
//     }
//     res.send(updateClassById);
//   }catch(e){
//     //console.log(schemaClass);
//     res.status(400).send(e);
//   }
// }; 