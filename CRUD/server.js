const express = require("express");
const dotenv = require("dotenv");
const Database = require("./database").connectDB;
const app = express();
dotenv.config();


// connect to DB
Database();

//Routes:
const employeeRoute = require("./routes/employeeRoute");
const authRoutes = require("./Routes/authRoutes");

// Server -> json
app.use(express.json());

app.use("/api/employees", employeeRoute);
app.use("/api/auth", authRoutes);

// listen to a given port
app.listen(process.env.PORT, () => {
  console.log("listening on port " + process.env.PORT);
});