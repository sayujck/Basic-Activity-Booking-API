import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { connectDB } from './config/db.js';
import authRouter from './routes/authRoute.js';
import activityRouter from './routes/activityRoute.js';
import bookingRouter from './routes/bookingRoute.js';

dotenv.config()
const app = express();
const port = process.env.PORT
connectDB();

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// routes
app.use("/api/auth", authRouter)
app.use("/api/activity", activityRouter)
app.use("/api/booking", bookingRouter)

app.listen(port, () => {
    console.log(`Server is running on at port ${port}`);
});
app.get('/', (req, res) => {
    res.status(200).send('Server started')
});

