import express from "express";
import bodyParser from "body-parser";
import {addClass,getClass,getClassbyId,deleteClassbyId,updateClassbyId} from "./routes/myClass";
import {addSubject,getSubject,getSubjectbyId,deleteSubjectbyId,updateSubjectbyId,getAllSubjectInClass} from "./routes/mySubject";
import {addStudent,getStudent,getStudentbyId,deleteStudentbyId,updateStudentbyId,getAllSubjectOfStudent} from "./routes/myStudent"
export default function createRouter() {
    const router =  express.Router();

    //Students
    router.post("/student/signup", addStudent);
    router.get("/student", getStudent);
    router.get("/student/:id", getStudentbyId);
    router.delete("/student/:id", deleteStudentbyId);
    router.patch("/student/update/:id", updateStudentbyId);
    router.get("/student/class/:classId", getAllSubjectOfStudent);

    //Class
    router.post("/class", addClass);
    router.get("/class", getClass);
    router.get("/class/:id", getClassbyId);
    router.delete("/class/:id", deleteClassbyId)
    router.patch("/class/:id", updateClassbyId);

    //Subject
    router.post("/subject", addSubject);
    router.get("/subject", getSubject);
    router.get("/subject/:id", getSubjectbyId);
    router.delete("/subject/:id", deleteSubjectbyId);
    router.patch("/subject/:id", updateSubjectbyId);
    router.get("/subject/class/:classId", getAllSubjectInClass);

    

    return router;
    
}


