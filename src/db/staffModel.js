import BaseModel from "./BaseModel";
import Staff from "../schema/staff.schema";
import { hashPassword, comparePassword } from "../lib/crypto";
export class StaffModel extends BaseModel{
    constructor(connection){
        super("STAFFINFO", connection);
        this.staffSchema = Staff;
        this.StaffName = "STAFFINFO";
        this.staffModel = this.connection.model(this.StaffName, this.staffSchema);
    }
    staffSignUp = async (StaffName,
                        Designation,
                        email,
                        password
                        )=>{
                            if (!this.staffMode) {
                                await this._getModel();
                              }
                              try{
                                const newStaff={
                                    StaffName,
                                    Designation,
                                    email,
                                    password: await hashPassword(password),
                                }
                                const createStaff= await this.staffModel.create(newStaff)
                                const staffResult=createStaff.save()
                                return staffResult;
                            }catch(error){
                                throw error
                            }
                        }
                        
}

export default new StaffModel();