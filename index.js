

const express = require('express');
const mongoose = require('mongoose');
const userRouters = require('./Routers/userRouters');
const productRouters = require("./Routers/productRouters")
const cors = require('cors');
const errorHandler = require('./middleware/errorHandler');
const app = express();

app.use(cors({
    origin: 'http://localhost:5173',       // ✅ allow your frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
    credentials: true                      // ✅ if using cookies or auth headers
}));

app.use(express.json());


app.use("/", userRouters);

app.use("/",productRouters);


app.use(errorHandler);

// MongoDB connection
mongoose.connect("mongodb+srv://veeranarayanavra:veera123@cluster0.cbmad.mongodb.net/FlightBooking?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => {
        console.log('MongoDB connected successfully');
        app.listen(3000, () => {
            console.log('Server is running on port 3000');
        });
    })
    .catch((error) => {
        console.log('MongoDB connection failed', error);
    });



