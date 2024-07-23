const express = require("express");
const connectDB = require("./config/db");
const errorMiddleware = require("./middlewares/errorMiddleware");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const path = require('path');
const fs = require("fs");
const https = require("https");

const app = express();
require("dotenv").config();

// Connect to the database
connectDB();

// Load SSL certificates
const options = {
    key: fs.readFileSync('./localhost-key.pem'),
    cert: fs.readFileSync('./localhost.pem')
};

// CORS Configuration
app.use(cors({
    origin: process.env.CLIENT_ADDRESS, // Ensure this is correctly set in your .env file
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

// CORP Header Configuration
app.use((req, res, next) => {
    res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
    next();
});

// Middleware
app.use(morgan("dev"));
app.use(express.json());
// app.use(helmet());

// Serve static files
app.use('/images', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use("/api/user", require("./routes/UserRotues"));
app.use("/api/incident", require("./routes/IncidentRoutes"));

// Error handling middleware
app.use(errorMiddleware);

// Start the HTTPS server
const PORT = process.env.PORT || 4000;
https.createServer(options, app).listen(PORT, () => {
    console.log(`Server is running on https://localhost:${PORT}`);
});

// Gracefully handle unexpected errors
process.on('uncaughtException', err => {
    console.error('Uncaught Exception:', err);
    // Close server and exit
    server.close(() => {
        process.exit(1);
    });
});

// Gracefully handle promise rejections
process.on('unhandledRejection', err => {
    console.error('Unhandled Rejection:', err);
    // Close server and exit
    server.close(() => {
        process.exit(1);
    });
});
