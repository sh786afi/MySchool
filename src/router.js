import express from "express";
import bodyParser from "body-parser";
import {addClass,getClass,getClassbyId,deleteClassbyId,updateClassbyId} from "./routes/myClass";
import {addSubject,getSubject,getSubjectbyId,deleteSubjectbyId,updateSubjectbyId,getAllSubjectInClass} from "./routes/mySubject";
import {addStudent,loginStudent,studentProfile,getStudentbyId,deleteStudentbyId,updateStudentbyId,getAllSubjectOfStudent,logoutStudent,logoutAllStudent} from "./routes/myStudent"
import {auth} from "./lib/auth"
export default function createRouter() {
    const router =  express.Router();

    //Students
    router.post("/student/signup", addStudent);
    // router.post("/student/login",loginStudent)
    // router.get("/student/me", auth,studentProfile);
    // router.get("/student/:id", getStudentbyId);
    // router.delete("/student/:id", deleteStudentbyId);
    // router.patch("/student/update/:id", updateStudentbyId);
    // router.get("/student/class/:classId", getAllSubjectOfStudent);
    // router.post("/student/logout",auth,logoutStudent);
    // router.post("/student/logoutAll",auth, logoutAllStudent)

    // //Class
    // router.post("/class", addClass);
    // router.get("/class", getClass);
    // router.get("/class/:id", getClassbyId);
    // router.delete("/class/:id", deleteClassbyId)
    // router.patch("/class/:id", updateClassbyId);

    // //Subject
    // router.post("/subject", addSubject);
    // router.get("/subject", getSubject);
    // router.get("/subject/:id", getSubjectbyId);
    // router.delete("/subject/:id", deleteSubjectbyId);
    // router.patch("/subject/:id", updateSubjectbyId);
    // router.get("/subject/class/:classId", getAllSubjectInClass);

    

    return router;
    
}


