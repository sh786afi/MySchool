import BaseModel from "./BaseModel";
import Class from "../schema/class.schema";
import { ApplicationError } from "../lib/errors";
export  class ClassModel extends BaseModel {
    constructor(connection){
        super("CLASSROOM", connection);
        this.schema = Class;
        this.name = "CLASSROOM";
        this.model = this.connection.model(this.name, this.schema);
    }
    create = async (
        ClassName,
        CapacityOfStudent
    )=>{
        if (!this.model) {
            await this._getModel();
          }
        try{
            const newClass = {
                ClassName,
                CapacityOfStudent
            };
            console.log('modelll',this.model)
            console.log('new Classs', newClass)
            const createClass =  await this.model.create(newClass)
            console.log('createClasssssssss',createClass);
            const result=await createClass.save(); 
            return result;
        }catch(error){
            console.log(createClass);
            //res.status(400).send(e)
            throw error
        }
    }
    getClass=async ()=>{
        try{
            const allClasses=await this.model.find({});
            //res.send(allClasses);
            return allClasses;
          }catch(error){
           // res.status(500).send(e);
            throw error
          }
    }
    findClassById=async (id)=>{
      
            const classById=await this.model.findById(id)         
            return classById;
            //res.send(classById);
    }
    deleteClassById=async (id)=>{
      
        const removeClassById=await this.model.findByIdAndRemove(id)         
        return removeClassById;
}
updateClass=async (id,info)=>{
    const updateClassById=await this.model.findByIdAndUpdate(id,info,{new:true});
    return updateClassById
}

    

}
export default new ClassModel();