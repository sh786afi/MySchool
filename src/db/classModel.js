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
            const createClass =  await this.model
            .create(newClass)
            console.log('createClasssssssss',createClass);
            await createClass.save();
        }catch(error){
            console.log(createClass);
            //res.status(400).send(e)
            throw error
        }
    }
    

}
export default new ClassModel();