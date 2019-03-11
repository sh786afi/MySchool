import jwt from "jsonwebtoken";
import {schemaStudent} from "../schema/student.schema";
import { model } from "mongoose";

const auth = async (req, res, next)=>{
    try{
        const token = req.header('Authorization').replace('Bearer ','')
        const decoded=jwt.verify(token,'thisismycourse') 
        const user=await schemaStudent.findOne({_id:decoded._id,'tokens.token':token})
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
module.exports= {auth};