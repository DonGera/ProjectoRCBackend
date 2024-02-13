const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

require("./database");

const routes = require("./routes/routes");

const app = express();

//! Middlewares
app.use(cors());
app.use(express.json());

app.use("/api", routes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () =>
	console.log(
		(`Server on port ${PORT}`)
	)
);