import BaseModel from "./BaseModel";
import Subject from "../schema/subject.schema";
import { ApplicationError } from "../lib/errors";
import Class from "../schema/class.schema";
export class SubjectModel extends BaseModel {
    constructor(connection) {
        super("SUBJECT", connection);
        this.schema = Subject;
        this.name = "SUBJECT";
        this.SubjectModel = this.connection.model(this.name, this.schema);
        this.ClassSchema = Class;
        this.ClassName = "CLASSROOM";
        this.ClassModel = this.connection.model(this.ClassName, this.ClassSchema);
    }
    create = async (SubjectName, classId) => {
        if (!this.SubjectModel) {
            await this._getModel();
        }
        try {
            const newSubject = {
                SubjectName,
                classId
            };
            const findClass = await this.ClassModel.findById(classId);
            if (!findClass) {
                throw new ApplicationError(
                    "Something doesn't look right. Please check your ClassID.",
                    401
                );
            }
            const createSubject = await this.SubjectModel.create(newSubject);
            const result = await createSubject.save();
            return result;
        } catch (error) {
            throw error;
        }
    };
    getSubject = async () => {
        try {
            const allSubject = await this.SubjectModel.find({});
            return allSubject;
        } catch (error) {
            throw error;
        }
    };
    findSubjectById = async id => {
        const subjectById = await this.SubjectModel.findById(id);
        return subjectById;
    };
    deleteSubjectById = async id => {
        const removeSubjectById = await this.SubjectModel.findByIdAndRemove(id);
        return removeSubjectById;
    };
    updateSubject = async (id, info) => {
        const findClass = await this.ClassModel.findById(info.classId);
        if (!findClass) {
            throw new ApplicationError(
                "Something doesn't look right. Please check your ClassID.",
                401
            );
        }

        const updateSubjectById = await this.SubjectModel.findByIdAndUpdate(
            id,
            info,
            {
                new: true
            }
        );
        return updateSubjectById;
    };
    subjectInClass = async classId => {
        const findClass = await this.ClassModel.findById(classId);
        if (!findClass) {
            throw new ApplicationError(
                "Something doesn't look right. Please check your ClassID.",
                401
            );
        }
        const subjectByClassId = await this.SubjectModel.find({ classId: classId });
        return subjectByClassId;
    };
}
export default new SubjectModel();