import jwt from "jsonwebtoken";
import {schemaStudent} from "../schema/student.schema";
import {configurationFile} from "./config"
import StudentModel from "../db/StudentModel";

export const auth = async (req, res)=>{
    try{
        const token = req.header('Authorization').replace('Bearer ','')
        const decoded=jwt.verify(token, configurationFile.development.JWT_SECRET) 
        
        const user=StudentModel.findToken(decoded, token) 
        //console.log('decoded',user)   
        if(!user){
            throw new error
        }
        req.token=token
        req.user = user
        next()
    }catch(e){
        res.status(401).send({error: 'Please Authenticate'});
    }
}
