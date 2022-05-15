import express from 'express';

import { getAttendanceDetails, createAttendanceDetails } from '../controllers/attendanceDetails.js';

const router = express.Router();

router.get('/:id', getAttendanceDetails);
router.post('/', createAttendanceDetails);

export default router;