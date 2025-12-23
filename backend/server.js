// imports

import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors'
import connectDB from './config/db.js';
import cors from 'cors';

//import testRoutes from './routes/testRoutes.js'
import authRoutes from './routes/authRoutes.js'
import errorMiddleware from './middlewares/errorMiddleware.js';
import userRoutes from './routes/userRoutes.js'
import jobsRoute from './routes/jobsRoute.js'

// config DOT ENV
dotenv.config()

// mongodb connection
connectDB();

// rest object
const app = express()

// ENABLE CORS 
app.use(cors({
    origin: "http://127.0.0.1:5500",
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

//middlewares
app.use(express.json());

// routes
// app.use('/api/v1/test', testRoutes)
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/job", jobsRoute);

// validation middleware
app.use(errorMiddleware);

// port
const PORT = process.env.PORT || 8080

// listen
app.listen(PORT, () => {
    console.log(`Server Running in ${process.env.DEV_MODE} Mode on port no ${PORT}`.bgCyan.white)
});
