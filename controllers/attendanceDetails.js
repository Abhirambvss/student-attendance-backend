import express from 'express';
import AttendanceDetails from '../models/attendanceDetailsSchema.js';

const router = express.Router();

export const getAttendanceDetails = async (req, res) => {
    const { id } = req.params;
    try {
        const postMessages = await AttendanceDetails.findOne({ email: id }).sort({ date: -1 });
        res.status(200).json(postMessages);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createAttendanceDetails = async (req, res) => {
    const { name, email, attendanceTimeAndDate, CourseCode } = req.body;
    try {
        const userExist = await AttendanceDetails.findOne({ email: email });
        if (userExist) {
            await AttendanceDetails.findOneAndUpdate(
                { email: email },
                {
                    $push: {
                        attendanceDetails: {
                            Course: CourseCode,
                            Time: attendanceTimeAndDate
                        }
                    }
                }
            );
        }
        else {
            const newPostMessage = new AttendanceDetails({ name, email, attendanceDetails: attendanceTimeAndDate });
            await newPostMessage.save();
            // AttendanceDetails.findOneAndUpdate(
            //     { email: email },
            //     { $push: {  } });

        }
        res.status(201).json(userExist);
    } catch (error) {
        console.log(error);
        res.status(409).json({ message: error.message });
    }
}



export default router;