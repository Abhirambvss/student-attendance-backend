import mongoose from 'mongoose';

const studentDetailsSchema = mongoose.Schema({
    name: String,
    rollNumber: {
        type: Number,
        unique: true,
    },
    imageURL: String,
    numberOfCourses: Number,
    // selectedFile: String,
    createdAt: {
        type: Date,
        default: new Date(),
    },
})

var StudentDetails = mongoose.model('StudentDetails', studentDetailsSchema);

export default StudentDetails;