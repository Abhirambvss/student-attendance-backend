import express from 'express';

import { getStudentDetails, createStudentDetails, findStudentDetails, deleteStudentDetails } from '../controllers/studentDetails.js';

const router = express.Router();

router.get('/', getStudentDetails);
router.post('/', createStudentDetails);
router.patch('/', findStudentDetails);
router.delete('/:id', deleteStudentDetails);

export default router;