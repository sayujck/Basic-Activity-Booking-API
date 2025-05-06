import express from 'express';
import { createActivity, getActivities } from '../controllers/activityController.js';

const activityRouter = express.Router();

activityRouter.post('/create', createActivity);
activityRouter.get('/get', getActivities);

export default activityRouter;