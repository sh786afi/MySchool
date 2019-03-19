import { route, successRoute } from "./";
import { comparePassword } from "../lib/crypto"
import StudentModel from "../db/StudentModel";
import jwt from "jsonwebtoken";


//Signup Student
export const addStudent = route(
  async (req, res) => {
    const {
      name,
      fatherName,
      email,
      age
    } = req.body;
    const newStudent = await StudentModel.createStudent(
      name,
      fatherName,
      email,
      age
    );
    res.send(await successRoute(newStudent));
  }
);
//find All Student
export const allStudent=route(async(req,res)=>{
  const totalStudentDetails=await StudentModel.findAllStudent();
  res.send(await successRoute(totalStudentDetails));
});
// Get Student By id
 export const getStudentbyId =route (async(req,res)=>{
  const _id = req.params.id;
  try{
    const studentById=await StudentModel.findStudentById(_id);
  if(!studentById){
      return res.status(400).send({error:'Student does not exist'}) 
  }
  res.send(await successRoute(studentById));
}catch(e){
  res.status(500).send(e);
}
});   
export const deleteStudentbyId = route(async (req, res) => {
  const _id = req.params.id;
  try {
    const deleteStudent = await StudentModel.deleteStudentById(_id);
    if (!deleteStudent) {
      return res.status(400).send({ error: 'Student does not exist' })
    }
    res.send(await successRoute(deleteStudent));
  } catch (e) {
    res.status(500).send(e);
  }
});
export const updateStudentbyId = route(async (req, res) => {
  const _id = req.params.id;
  const info = req.body;
  try {
    const updateStudentById = await StudentModel.updateStudent(_id, info);
    if (!updateStudentById) {
      return res.status(404).send({ error: 'Student does not exist' })
    }
    res.send(await successRoute(updateStudentById));
  } catch (e) {
    res.status(400).send(e);
  }
}); 
 



