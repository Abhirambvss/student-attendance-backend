import express from 'express';

import { getCourseDetails, createCourseDetails, deleteCourseDetails } from '../controllers/courseDetails.js';

const router = express.Router();

router.get('/:id', getCourseDetails);
router.post('/', createCourseDetails);
router.delete('/:id', deleteCourseDetails);

export default router;