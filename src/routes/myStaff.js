import { comparePassword } from "../lib/crypto";
import { route, successRoute } from "./";
import _ from "lodash";
import StaffModel from "../db/staffModel";
export const addStaff = route(
  async (req, res) => {
    const { StaffName, Designation, email, password } = req.body;
    const result = await StaffModel.staffSignUp(
      StaffName,
      Designation,
      email,
      password
    );
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
