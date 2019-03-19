import { route, successRoute } from "./";
import StudentClassModel from "../db/StudentClassModel";

export const addClassStudent = route(async (req, res) => {
  const { classId, students } = req.body;
  const newMap = await StudentClassModel.mapClassStudent(classId, students);
  res.send(await successRoute(newMap));
});
export const getStudentInClass = route(async (req, res) => {
  const classId = req.params.classId;
  const getStudent = await StudentClassModel.getStudentByClass(classId);
  res.send(await successRoute(getStudent));
});
