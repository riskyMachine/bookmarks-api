const Bookmark = require("../models/bookmark.model");
const User = require("../models/user.model");

async function createBookmark({ userId, link, title, publisher }) {
	let bookmark = new Bookmark({ userId, link, title, publisher });
	await bookmark.save();
	return bookmark;
}

async function deleteBookmarkByLink({ link }) {
	let result = await Bookmark.deleteOne({ link });
	return result;
}

async function getAllBookmarks({ email }) {
	let user = await User.findOne({ email });
	let bookmarks = await Bookmark.find({ userId: user._id });
	return bookmarks;
}

async function retrieveBookmark({ userId, link }) {
	let bookmark = await Bookmark.findOne({ userId, link });
	return bookmark;
}

module.exports = {
	createBookmark,
	deleteBookmarkByLink,
	getAllBookmarks,
	retrieveBookmark,
};
