import express from 'express';
import { createBooking, getBookingByUser } from '../controllers/bookingController.js';
import authUser from '../middlewares/authUser.js';

const bookingRouter = express.Router();

bookingRouter.post('/create', authUser, createBooking);
bookingRouter.get('/get', authUser, getBookingByUser);


export default bookingRouter;