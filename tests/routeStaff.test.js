import request from "supertest";
import { server } from "../src/index";
import StaffModel from "../src/db/staffModel";
import mongoose from "mongoose";
import { hashPassword, comparePassword } from "../src/lib/crypto";
import { generateToken } from "../src/lib/token";
import { realpathSync } from "fs";

const fakeId = new mongoose.Types.ObjectId();
const staffOneId = new mongoose.Types.ObjectId();
const password = hashPassword("123456");
const tokenId = generateToken(staffOneId);
const random = Math.floor(Math.random() * 8999 + 1000);
const staffOne = {
  _id: staffOneId,
  StaffName: "Taj Pasha",
  Designation: "Computer Teacher",
  email: `taj${random}@xelpmoc.in`,
  password: password,
  token: tokenId
};
describe("/staff/signup", () => {
  beforeEach(async () => {
    //server;
  });
  afterEach(async () => {
    server.close();
  });
  describe("POST /", async () => {
    test("Should create a Staff", async () => {
      await request(server)
        .post("/staff/signup")
        .send({
          _id: staffOneId,
          StaffName: "Taj Pasha",
          Designation: "Computer Teacher",
          email: `taj${random}@xelpmoc.in`,
          password: "123456"
        })
        .expect(200);
    });
  });
});
