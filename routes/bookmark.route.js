const express = require("express");
const router = new express.Router();
const { getUser } = require("../controllers/user.controller");
const {
	createBookmark,
	deleteBookmarkByLink,
	getAllBookmarks,
} = require("../controllers/bookmark.controller");

// Create Bookmark
router.post("/create", async (req, res) => {
	try {
		let { name, email, link, title, publisher } = req.body;
		let user = await getUser({ name, email });
		let bookmark = await createBookmark({
			userId: user._id,
			link,
			title,
			publisher,
		});
		res.status(200).send(bookmark);
	} catch (e) {
		res.send(e);
	}
});

// Delete Bookmark
router.delete("/delete", async (req, res) => {
	try {
		let { link } = req.body;
		let result = await deleteBookmarkByLink({ link });
		res.status(200).send(result);
	} catch (e) {
		res.send(e);
	}
});

// Get all Bookmarks
router.get("/get", async (req, res) => {
	try {
		let { email } = req.body;
		let bookmarks = await getAllBookmarks({ email });
		res.status(200).send(bookmarks);
	} catch (e) {
		res.send(e);
	}
});

module.exports = router;
