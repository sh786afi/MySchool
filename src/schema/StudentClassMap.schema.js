import mongoose from "mongoose";

const Schema = mongoose.Schema;
const StudentClass = new Schema({
    classId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    students: [{
        studentId: {
            type: Schema.Types.ObjectId,
            required: true
        }
    }]
})

export default StudentClass;