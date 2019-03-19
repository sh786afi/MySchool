import BaseModel from "./BaseModel";
import Student from "../schema/student.schema";
import StudentClass from "../schema/StudentClassMap.schema";
import { ApplicationError } from "../lib/errors";
import Class from "../schema/class.schema";
export class StudentClassModel extends BaseModel {
  constructor(connection) {
    super("STUDENTCLASSMAP", connection);
    this.schema = StudentClass;
    this.name = "STUDENTCLASSMAP";
    this.studentMapModel = this.connection.model(this.name, this.schema);
    this.StudentSchema = Student;
    this.StudentName = "STUDENTINFO";
    this.StudentModel = this.connection.model(
      this.StudentName,
      this.StudentSchema
    );
    this.ClassSchema = Class;
    this.ClassName = "CLASSROOM";
    this.ClassModel = this.connection.model(this.ClassName, this.ClassSchema);
  }
  mapClassStudent = async (classId, students) => {
    if (!this.studentMapModel) {
      await this._getModel();
    }
    try {
      const newMap = {
        classId,
        students
      };
      //for each
      // map
      var studentsData = [];
      for (var i = 0; i < students.length; i++) {
        var data = await this.StudentModel.findById(students[i].studentId);
        if (data != null) {
          studentsData.push(data);
        }
      }
      //   let studentsData = [];
      //   students.map(async student => {
      //     const data = await this.model.findById(student.studentId);
      //     //console.log(data);
      //     studentsData.push(data);
      //   });
      const findClass = await this.ClassModel.findById(classId);

      if (students.length != studentsData.length || !findClass) {
        throw new ApplicationError(
          "Something doesn't look right. Please check your StudentId or classId.",
          401
        );
      }
      const createMapping = await this.studentMapModel.create(newMap);
      const result = await createMapping.save();
      return result;
    } catch (error) {
      throw error;
    }
  };
}
export default new StudentClassModel();
