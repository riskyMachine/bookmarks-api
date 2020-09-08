const Tag = require("../models/tags.model");
const User = require("../models/user.model");
const Bookmark = require("../models/bookmark.model");

async function createTags({ userId, tags }) {
	let tagsDoc = await Tag.findOne({ userId });
	if (!tagsDoc) {
		tagsDoc = new Tag({ userId });
	}
	tags = [...new Set(tags.map((el) => el.toLowerCase()))];
	tagsDoc.tags.forEach((el) => {
		if (tags.indexOf(el.title) > -1) {
			tags.splice(tags.indexOf(el.title), 1);
		}
	});
	tags.forEach((tag) => {
		tagsDoc.tags = tagsDoc.tags.concat({ title: tag });
	});
	await tagsDoc.save();
	return tagsDoc;
}

async function getTags({ userId }) {
	let tagsDoc = await Tag.findOne({ userId });
	return tagsDoc;
}

async function deleteTags({ email, tags }) {
	tags = filterTags(tags);
	let user = await User.findOne({ email });
	tags.forEach(async (tag) => {
		await Tag.updateOne(
			{ userId: user._id },
			{ $pull: { tags: tag } },
			function (err, val) {
				if (err) {
					console.log(err);
					return err;
				}
				console.log(val);
			}
		);
	});
}

async function addTagsToBookmark({ bookmarkId, tags, existingTags, tagsDoc }) {
	tags = [...new Set(tags.map((el) => el.toLowerCase()))];
	let tagIds = [];
	tags.forEach((tag) => {
		let id = tagsDoc.tags.find((el) => el.title === tag)._id;
		if (existingTags.indexOf(id) < 0) {
			tagIds.push(id);
		}
	});
	tagIds.forEach(async (tagId) => {
		await Bookmark.updateOne(
			{ _id: bookmarkId },
			{ $addToSet: { tags: tagId } },
			function (err, val) {
				if (err) {
					console.log(err);
				} else {
					console.log(val);
				}
			}
		);
	});
}

async function removeTagsFromBookmark({ userId, link, tags }) {
	tags = [...new Set(tags.map((el) => el.toLowerCase()))];
	let bookmark = await Bookmark.findOne({ userId, link });
	let tagsDoc = await createTags({ userId, tags });
	let tagIds = [];
	tags.forEach((tag) => {
		let id = tagsDoc.tags.find((el) => el.title === tag)._id;
		tagIds.push(id);
	});
	await Bookmark.updateMany(
		{ _id: bookmark._id },
		{ $pullAll: { tags: tagIds } },
		function (err, val) {
			if (err) {
				console.log(err);
			} else {
				console.log(val);
			}
		}
	);
}

function filterTags(tags) {
	tags = [...new Set(tags.map((el) => el.toLowerCase()))];
	tags = tags.map((el) => {
		return { title: el };
	});
	return tags;
}

module.exports = {
	createTags,
	getTags,
	deleteTags,
	addTagsToBookmark,
	removeTagsFromBookmark,
};
