import express from 'express';

import { getStudentDetails, createStudentDetails, findStudentDetails, deleteStudentDetails } from '../controllers/studentDetails.js';

const router = express.Router();

router.get('/:id', getStudentDetails);
router.post('/', createStudentDetails);
router.patch('/', findStudentDetails);
router.delete('/:id', deleteStudentDetails);

export default router;