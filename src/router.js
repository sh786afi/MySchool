import express from "express";
import bodyParser from "body-parser";
import {
  addClass,
  getClass,
  getClassbyId,
  deleteClassbyId,
  updateClassbyId
} from "./routes/myClass";
import {
  addSubject,
  getSubject,
  getSubjectbyId,
  deleteSubjectbyId,
  updateSubjectbyId,
  getAllSubjectInClass
} from "./routes/mySubject";
import {
  addStudent,
  allStudent,
  getStudentbyId,
  deleteStudentbyId,
  updateStudentbyId,
  getAllSubjectOfStudent,
  logoutStudent,
  logoutAllStudent
} from "./routes/myStudent";
import {addClassStudent} from "./routes/StudentClassMap"
import { addStaff, loginStaff, staffProfile, logoutStaff } from "./routes/myStaff";
import { verifyToken } from "./lib/session"
export default function createRouter() {
  const router = express.Router();

  //Staff Api
  router.post("/staff/signup", addStaff);
  router.post("/staff/login", loginStaff);
  //router.get("/staff/me", verifyToken, staffProfile);
  router.post("/staff/logoutAll", verifyToken, logoutStaff)

  //AddClass
  router.post("/class", verifyToken, addClass);
  router.get("/class", verifyToken, getClass);
  router.get("/class/:id", verifyToken, getClassbyId);
  router.delete("/class/:id", verifyToken, deleteClassbyId);
  router.patch("/class/:id", verifyToken, updateClassbyId);

  //Students
  router.post("/student/add", verifyToken, addStudent);
  router.get("/student", verifyToken, allStudent);
  router.get("/student/:id", verifyToken, getStudentbyId);
  router.delete("/student/:id", deleteStudentbyId);
  router.patch("/student/update/:id", verifyToken, updateStudentbyId);
  // router.get("/student/class/:classId", getAllSubjectOfStudent);
  // router.post("/student/logout",auth,logoutStudent);

  //StudentClassMap

  router.post("/student/map",addClassStudent);



  // //Subject
  router.post("/subject/add", verifyToken, addSubject);
  router.get("/subject", verifyToken, getSubject);
  router.get("/subject/:id", verifyToken, getSubjectbyId);
  router.delete("/subject/:id", verifyToken, deleteSubjectbyId);
  router.patch("/subject/:id", updateSubjectbyId);
  router.get("/subject/class/:classId", verifyToken, getAllSubjectInClass);

  return router;
}
