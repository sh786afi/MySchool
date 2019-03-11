import { route, successRoute } from "./";
import ClassModel from "../db/classModel";

//Add a new Class API
    export const addClass= route(
        async (req,res)=>{
          const {
            ClassName,
            CapacityOfStudent
          } = req.body;
          const newClass = await ClassModel.create(
            ClassName,
            CapacityOfStudent
          );
          console.log('newwww class',newClass)
         res.send(await successRoute(newClass));
        }
      );
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