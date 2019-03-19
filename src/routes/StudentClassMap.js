import { route, successRoute } from "./";
import StudentClassModel from "../db/StudentClassModel";

export const addClassStudent = route(
    async (req, res) => {
      const {
        classId,
        students
      } = req.body;
      const newMap = await StudentClassModel.mapClassStudent(
        classId,
        students
      );
      console.log('newwww map', newMap)
      res.send(await successRoute(newMap));
    }
  );