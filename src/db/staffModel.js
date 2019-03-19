import { ApplicationError } from "../lib/errors";
import BaseModel from "./BaseModel";
import Staff from "../schema/staff.schema";
import { generateToken } from "../lib/token";
import { hashPassword, comparePassword } from "../lib/crypto";
export class StaffModel extends BaseModel {
  constructor(connection) {
    super("STAFFINFO", connection);
    this.staffSchema = Staff;
    this.StaffName = "STAFFINFO";
    this.staffModel = this.connection.model(this.StaffName, this.staffSchema);
  }
  staffSignUp = async (StaffName, Designation, email, password) => {
    try {
      if (!this.staffMode) {
        await this._getModel();
      }
      const newStaff = {
        StaffName,
        Designation,
        email,
        password: await hashPassword(password)
      };
      const findEmail = await this.staffModel.find({ email });
      if (findEmail == 0) {
        const createStaff = await this.staffModel.create(newStaff);
        const staffResult = await createStaff.save();
        const token = await generateToken(staffResult._id);
        return { staffResult, token };
      } else {
        throw new ApplicationError(
          "Something doesn’t look right. Please check your email ID and password again.",
          401
        );
      }
    } catch (error) {
      return error;
    }
  };
  findByCredential = async (email, password) => {
    const staffUser = await this.staffModel.findOne({ email });
    if (!staffUser) {
      throw new ApplicationError(
        "Something doesn’t look right. Please check your email ID and password again.",
        401
      );
    }
    const token = await generateToken(staffUser._id);
    const result = { staffUser, token };
    return result;
  };
  getStaffById = async id => {
    const staffUser = await this.staffModel.findById(id);
    return staffUser;
  };
}

export default new StaffModel();
