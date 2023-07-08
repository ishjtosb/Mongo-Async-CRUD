require("dotenv").config();
const express = require("express");
const app = express();
const port = 8080;
const fs = require('fs')
const path = require("path")
const {logger} = require("./middleware/logEvents")
const errorLog = require('./middleware/errorLog')
const cors = require('cors');
const corsOptions = require("./config/corsConfig");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const connectDB = require("./config/dbConnection");

//Routes
const subdirRouter = require("./routes/subdirRoute");
const rootRouter = require("./routes/rootRouter");
const apiRouter = require("./routes/api/employeeRouter");
const regsisterRouter = require("./routes/registerRoute");
const authRouter = require("./routes/authRouter");
const verifyJWT = require("./middleware/verifyJWT");
const refreshTokenRouter = require("./routes/refreshTokenRouter");
const logoutRouter = require("./routes/logoutRouter");
const userRouter = require("./routes/api/userRouter");

// ----- Connect to MongoDB -----
connectDB();


// ----- BUILT IN MIDDLEWARE -----
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cookieParser())

// ----- CUSTOM MIDDLEWARE -----
app.use(logger)

app.use(cors(corsOptions))

// ----- SERVE STATIC FILES TO THE SERVER -----
app.use(express.static(path.join(__dirname, 'public')));
app.use("/subdir", express.static(path.join(__dirname, 'public')));

app.use("/login", authRouter);

app.use("/register", regsisterRouter);

app.use("/subdir", subdirRouter);

app.use("/", rootRouter)

app.use("/refresh", refreshTokenRouter)

app.use("/logout", logoutRouter);

app.use(verifyJWT)

app.use("/users", userRouter);

app.use("/employees", apiRouter);

app.use(errorLog)

//---- Waits for mongoose to return "open" which is connected state and only then listens to incoming requests
mongoose.connection.once("open", () => {
    console.log("Connected to MongoDB!")
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
})