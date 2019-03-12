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
//Get all Class api
export const getClass = route(async(req,res)=>{
  const getAllClass=await ClassModel.getClass();
  res.send(await successRoute(getAllClass));
    
 }
);
  export const getClassbyId =route (async(req,res)=>{
    const _id = req.params.id;
    try{
      const classById=await ClassModel.findClassById(_id);
    if(!classById){
        return res.status(400).send({error:'Class does not exist'}) 
    }
    res.send(await successRoute(classById));
 }catch(e){
    res.status(500).send(e);
  }
  }
);     
 export const deleteClassbyId = route(async(req,res)=>{
  const _id = req.params.id;

  try{
    const deleteClass=await ClassModel.deleteClassById(_id);
    if(!deleteClass){
      return res.status(400).send({error:'Class does not exist'}) 
    }
    res.send(await successRoute(deleteClass));
  }catch(e){
    //console.log(schemaClass);
    res.status(500).send(e);
  }
}); 
export const updateClassbyId = route(async(req,res)=>{
  const _id = req.params.id;
  const info=req.body;
  try{
    const updateClassById=await ClassModel.updateClass(_id,info);
    if(!updateClassById){
      return res.status(404).send({error:'Class does not exist'})
    }
    res.send(await successRoute(updateClassById));
  }catch(e){
    //console.log(schemaClass);
    res.status(400).send(e);
  }
}); 