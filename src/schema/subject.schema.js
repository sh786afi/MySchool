import mongoose from "mongoose";

const Schema = mongoose.Schema;
const Subject=new Schema({
    SubjectName: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    classId:  { type: mongoose.Types.ObjectId}
})
export default Subject;