import Booking from "../models/bookingModel.js";

export const createBooking = async (req, res) => {
    try {
        const { userId, activityId } = req.body;
        const existingBooking = await Booking.findOne({ userId, activityId });
        if (existingBooking) {
            return res.status(401).json({ message: "Already booked" });
        }
        const newBooking = new Booking({
            userId,
            activityId
        });
        await newBooking.save();
        res.status(201).json({ 
            booking: newBooking,
            message: "Booking created successfully"
         });
    } catch (error) {
        res.status(500).json({ message: "Error creating booking"});
    }
}

export const getBookingByUser = async (req, res) => {
    try {
        const userId = req.userId;
        const bookings = await Booking.find({ userId }).populate('activityId');
        res.status(200).json({ bookings });
    } catch (error) {
        res.status(500).json({ message: "Error fetching bookings"});
    }
}
