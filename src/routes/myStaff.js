import { comparePassword } from "../lib/crypto";
import { logoutGenerateToken } from "../lib/token";
import { route, successRoute } from "./";
import _ from "lodash";
import StaffModel from "../db/staffModel";
export const addStaff = route(
  async (req, res) => {
    //console.log(req.body);

    const { StaffName, Designation, email, password } = req.body;
    const result = await StaffModel.staffSignUp(
      StaffName,
      Designation,
      email,
      password
    );
    //console.log(result);
    res.send(await successRoute(result));
  },
  {
    requiredFields: ["StaffName", "Designation", "email", "password"]
  }
);
// Login staff
export const loginStaff = route(async (req, res) => {
  const staffUser = await StaffModel.findByCredential(
    req.body.email,
    req.body.password
  );
  const isMatch = await comparePassword(
    req.body.password,
    staffUser.staffUser.password
  );
  if (!isMatch) {
    res.status(404).send({ error: "Incorrect password" });
  }
  staffUser.staffUser.password = undefined;
  res.send(await successRoute(staffUser));
});
//staff Profile
export const staffProfile = route(async (req, res) => {
  //const staffProfileData=req.user;
  // staffProfileData.password=undefined;
  res.send(await successRoute(req.user));
});
