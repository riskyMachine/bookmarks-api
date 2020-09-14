const Bookmark = require("../models/bookmark.model");
const User = require("../models/user.model");
const { getTags } = require('./tag.controller');

async function createBookmark({ userId, link, title, publisher }) {
	let bookmark = new Bookmark({ userId, link, title, publisher });
	await bookmark.save();
	return bookmark;
}

async function deleteBookmark({ userId, link }) {
	let result = await Bookmark.deleteOne({ userId, link });
	return result;
}

async function getAllBookmarks({ email }) {
	let user = await User.findOne({ email });
	let bookmarks = await Bookmark.find({ userId: user._id });
	let tags = await getTags({ userId: bookmarks[0].userId });
	bookmarks = JSON.parse(JSON.stringify(bookmarks));
	bookmarks[0].tags = tags.tags.map(tag => tag.title);
	console.log(bookmarks);
	return bookmarks;
}

async function retrieveBookmark({ userId, link }) {
	let bookmark = await Bookmark.findOne({ userId, link });
	return bookmark;
}

module.exports = {
	createBookmark,
	deleteBookmark,
	getAllBookmarks,
	retrieveBookmark,
};
