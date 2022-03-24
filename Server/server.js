const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const port = process.env.PORT || 8500;
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db.config");
dotenv.config();
app.use(express.urlencoded({ extended: false }));
connectDB();

app.use(cookieParser());
app.use(express.json());
app.use(cors());



const Electricity = require("./routes/meter.routes");

app.use("/api/tokens", Electricity);

app.get("/", (req, res) => {
	res.status(200).json({success: true,message: "Welcome to tokens Electricity system.",
	});
});


app.listen(
	port,
	console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${port}`)
);