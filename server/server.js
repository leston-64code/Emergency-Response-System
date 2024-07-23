const express = require("express")
const connectDB = require("./config/db")
const errorMiddleware = require("./middlewares/errorMiddleware")
const morgan = require("morgan")
const helmet = require("helmet")
const cors = require("cors")
const path = require('path');

const app = express()
require("dotenv").config()

connectDB()

app.use(cors({
    origin: `${process.env.CLIENT_ADDRESS}`,
    credentials: true,
}))


// Middlewares
app.use(morgan("dev"));
app.use(express.json())
app.use(helmet())


app.use('/images', express.static(path.join(__dirname, 'uploads')));
console.log(path.join(__dirname,"uploads"))
app.use("/api/user", require("./routes/UserRotues"))
app.use("/api/incident", require("./routes/IncidentRoutes"))



app.use(errorMiddleware)

const PORT = process.env.PORT || 4000

const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

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
