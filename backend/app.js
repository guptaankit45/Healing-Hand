const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
var cors = require('cors');

require("dotenv").config();
const PORT = process.env.PORT || 8000;

const cookieParser = require("cookie-parser");
const errorHandler = require("./middleware/error");

//database connection
const connectDB = require("./config/database");
connectDB();

//middleware
app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "5mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "5mb",
    extended: true,
  })
);

app.use(cookieParser());
app.use(cors());


// error middleware
app.use(errorHandler);


//routes
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
app.use("/api",authRoutes);
app.use("/api",userRoutes);

//server started
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});