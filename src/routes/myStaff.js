import { route, successRoute } from "./";
import StaffModel from "../db/staffModel"
export const addStaff=route(
    async(req,res)=>{
        const{
            StaffName,
            Designation,
            email,
            password
        }=req.body;
        const addStaff =await StaffModel.staffSignUp(
            StaffName,
            Designation,
            email,
            password
        );
        res.send(await successRoute(addStaff));
    }
)
