import mongoose from 'mongoose';
import StudentDetails from './studentDetailsSchema.js'
const courseDetailsSchema = mongoose.Schema({
    CourseName: String,
    CourseCode: {
        type: String,
        unique: true,
    },

    Students: [{ type: mongoose.Schema.Types.ObjectId, ref: StudentDetails }],

})

var CourseDetails = mongoose.model('courseDetails', courseDetailsSchema);

export default CourseDetails;