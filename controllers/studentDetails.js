import express from 'express';
import mongoose from 'mongoose';
import StudentDetails from '../models/studentDetailsSchema.js';
import CourseDetails from '../models/courseDetailsSchema.js';

const router = express.Router();

export const getStudentDetails = async (req, res) => {

    try {
        const { id } = req.params;
        const postMessages =
            await CourseDetails.findOne({ CourseCode: id })
                .populate("Students")
        // console.log(postMessages);
        res.status(200).json(postMessages);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}


export const createStudentDetails = async (req, res) => {
    const { name, rollNumber, imageURL, CourseCode } = req.body;
    const student = await StudentDetails.findOne({ rollNumber: rollNumber });
    if (student) {
        const StudentInCourse = await CourseDetails.findOne({ CourseCode: CourseCode }).populate({
            path: 'Students',
            match: { rollNumber: { $eq: rollNumber } },
        }).exec()
        if (StudentInCourse.Students.length) {
            res.json({ message: `Student with Roll Number: ${rollNumber} is already in the Course : ${CourseCode}` })
        }
        else {
            const AddStudentInCourse = await CourseDetails.findOneAndUpdate(
                { CourseCode: CourseCode },
                {
                    $push: { Students: student._id },
                }
            )
            await StudentDetails.findOneAndUpdate(
                { rollNumber: rollNumber },
                { $inc: { numberOfCourses: 1 } }
            )
            res.status(201).json(AddStudentInCourse);
            console.log(AddStudentInCourse);
        }
    }
    else {
        const newPostMessage = new StudentDetails({ name, rollNumber, imageURL })

        try {
            await newPostMessage.save();
            await CourseDetails.findOneAndUpdate(
                { CourseCode: CourseCode },
                { $push: { Students: newPostMessage._id } }
            );
            await StudentDetails.findOneAndUpdate(
                { rollNumber: rollNumber },
                { $inc: { numberOfCourses: 1 } }
            )
            res.status(201).json(newPostMessage);
        } catch (error) {
            res.status(409).json({ message: error.message });
            console.log(error.message);
        }
    }
}

export const findStudentDetails = async (req, res) => {
    const { rollNumber, CourseCode } = req.body;

    // if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No Student Details with id: ${id}`);
    CourseDetails.findOne({ CourseCode: CourseCode }).populate({
        path: 'Students',
        match: { rollNumber: { $eq: rollNumber } },
    }).exec(function (err, doc) {
        if (doc.Students.length) {
            StudentDetails.findOne({ rollNumber: { $eq: rollNumber } }, function (err, docs) {
                if (err) {
                    console.log(err)
                }
                else {
                    // console.log("Result : ", docs);
                    res.json(docs);

                }
            })
        }
        else { return res.json({ message: `Student with Roll Number: ${rollNumber} is not registered in the Course : ${CourseCode}` }) }

    })
}


export const deleteStudentDetails = async (req, res) => {
    const { id } = req.params;
    const { CourseCode } = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    try {
        await CourseDetails.findOne({ CourseCode: CourseCode }).updateOne(
            { $pull: { Students: id } }
        );
        await StudentDetails.findOneAndUpdate(
            { _id: id },
            { $inc: { numberOfCourses: -1 } }
        )
        const students = await StudentDetails.findOne({ _id: id })
        if (!students.numberOfCourses) {
            await StudentDetails.findByIdAndRemove(id);
        }

    } catch (error) {
        console.log(error);
    }

    res.json({ message: "Student Details deleted successfully." });
}




export default router;