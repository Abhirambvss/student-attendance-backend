import express from 'express';

import { getCourseDetails, createCourseDetails } from '../controllers/courseDetails.js';

const router = express.Router();

router.get('/:id', getCourseDetails);
router.post('/', createCourseDetails);

export default router;