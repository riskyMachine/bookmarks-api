const { Router } = require("express");
const bookmarkRoutes = require("./bookmark.route");
const tagRoutes = require("./tags.route");

const routes = new Router();

routes.use("/bookmarks", bookmarkRoutes);
routes.use("/tags", tagRoutes);

routes.all("*", (req, res) =>
	res.status(404).send({
		code: 404,
		message: "URL not found",
	})
);

module.exports = routes;
