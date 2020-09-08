const mongoose = require("mongoose");
const express = require("express");
const app = express();
const ApiRoutes = require("./routes");

app.use(express.json());
app.use("/", ApiRoutes);

mongoose.connect("mongodb://127.0.0.1:27017/bookmarksDB", {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
	useFindAndModify: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connectin error:"));
db.once("open", () => {
	console.log("Connected to server");
});

app.listen(3000, () => {
	console.log("Serving on port 3000");
});
