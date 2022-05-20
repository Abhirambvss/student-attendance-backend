import express from 'express';
import mongoose from 'mongoose';
import CourseDetails from '../models/courseDetailsSchema.js';
import TeacherDetails from '../models/teacherDetailsSchema.js';
const router = express.Router();

export const getCourseDetails = async (req, res) => {
    const { id } = req.params;
    try {
        const postMessages = await TeacherDetails.findOne({ email: id })
            .populate('Courses');
        res.status(200).json(postMessages);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createCourseDetails = async (req, res) => {
    const { CourseName, CourseCode, name, email } = req.body;
    try {

        const newPostMessage = new CourseDetails({ CourseName, CourseCode });
        const teacher = await TeacherDetails.findOne({ email: email });
        if (teacher) {
            await TeacherDetails.findOneAndUpdate(
                { email: email },
                { $push: { Courses: newPostMessage._id } }
            );
        }
        else {
            const saveTeacherDetails = new TeacherDetails({ name, email });
            await saveTeacherDetails.save();
            await TeacherDetails.findOneAndUpdate(
                { email: email },
                { $push: { Courses: newPostMessage._id } }
            );
        }

        await newPostMessage.save();
        res.status(201).json(newPostMessage);

    } catch (error) {
        console.log(error);
        res.status(409).json({ message: error.message });
    }
}

export const deleteCourseDetails = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    try {
        await CourseDetails.findByIdAndRemove(id);
    }
    catch (error) {
        console.log(error);
    }

    res.json({ message: "Course Details deleted successfully." });
}

export default router;