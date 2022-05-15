import mongoose from 'mongoose';

const attendanceDetailsSchema = mongoose.Schema({
    name: String,
    email: String,
    // selectedFile: String,
    attendanceDetails: [{
        Course: String,
        Time: String
    }],
    createdAt: {
        type: Date,
        default: new Date(),
    },
})

var AttendanceDetails = mongoose.model('AttendanceDetails', attendanceDetailsSchema);

export default AttendanceDetails;