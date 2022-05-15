import mongoose from 'mongoose';
import CourseDetails from './courseDetailsSchema.js';
const teacherDetailsSchema = mongoose.Schema({
    name: String,
    email: {
        type: String,
        unique: true,
    },
    Courses: [{ type: mongoose.Schema.Types.ObjectId, ref: CourseDetails }],

})

var TeacherDetails = mongoose.model('TeacherDetails', teacherDetailsSchema);

export default TeacherDetails;