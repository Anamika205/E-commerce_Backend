const mongoose = require("mongoose");
const userRoutes = require('./Routes/UserRoutes')
const cors = require("cors");
const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const app = express();


app.use(cors({
  origin: "*",  // Allow all origins (change this to specific domains in production)
  methods: ["GET", "POST","PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

const MongoURI = process.env.MONGOURL
const PORT = process.env.PORT || 3000

app.use(express.json());

mongoose.connect(MongoURI)
.then(()=>{console.log("Connected to mongoDB successfully!")})
.catch((error)=>{console.log("Mongodb  connection error",error)})

app.use("/api",userRoutes)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
