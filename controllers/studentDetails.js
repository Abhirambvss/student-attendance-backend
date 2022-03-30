import express from 'express';
import mongoose from 'mongoose';

import StudentDetails from '../models/studentDetailsSchema.js';

const router = express.Router();

export const getStudentDetails = async (req, res) => {
    try {
        const postMessages = await StudentDetails.find();

        res.status(200).json(postMessages);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

// export const getPost = async (req, res) => {
//     const { id } = req.params;

//     try {
//         const post = await PostMessage.findById(id);

//         res.status(200).json(post);
//     } catch (error) {
//         res.status(404).json({ message: error.message });
//     }
// }

export const createStudentDetails = async (req, res) => {
    const { name, rollNumber, imageURL, creator, tags } = req.body;
    console.log(imageURL);
    const newPostMessage = new StudentDetails({ name, rollNumber, imageURL })

    try {
        await newPostMessage.save();

        res.status(201).json(newPostMessage);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const findStudentDetails = async (req, res) => {
    const { rollNumber } = req.body;

    // if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No Student Details with id: ${id}`);

    // const studentDetails = { Name, ID, selectedFile, _id: id };
    await StudentDetails.findOne({ rollNumber: { $eq: rollNumber } }, function (err, docs) {
        if (err) {
            console.log(err)
        }
        else {
            console.log("Result : ", docs);
            res.json(docs);

        }
    });

}

export const deleteStudentDetails = async (req, res) => {
    const { id } = req.params;
    console.log(id);
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    try {
        await StudentDetails.findByIdAndRemove(id);

    } catch (error) {
        console.log(error);
    }

    res.json({ message: "Student Details deleted successfully." });
}




export default router;