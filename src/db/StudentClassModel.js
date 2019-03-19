import BaseModel from "./BaseModel";
import StudentClass from "../schema/StudentClassMap.schema";
import { ApplicationError } from "../lib/errors";
export class StudentClassModel extends BaseModel {
    constructor(connection) {
        super("STUDENTCLASSMAP", connection);
        this.schema = StudentClass;
        this.name = "STUDENTCLASSMAP";
        this.studentMapModel = this.connection.model(this.name, this.schema);
    }
    mapClassStudent = async (
        classId,
        students
    ) => {
        if (!this.studentMapModel) {
            await this._getModel();
        }
        try {
            const newMap = {
                classId,
                students
            };
            const createMapping = await this.studentMapModel.create(newMap)
            const result = await createMapping.save();
            return result;
        } catch (error) {
            throw error
        }
    }
}
export default new StudentClassModel();