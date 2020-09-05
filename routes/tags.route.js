const express = require('express');
const router = new express.Router();
const { getUser } = require('../controllers/user.controller');
const { retrieveBookmark } = require('../controllers/bookmark.controller');
const { createTags, getTags, deleteTags, addTagsToBookmark, removeTagsFromBookmark } = require('../controllers/tag.controller');
const Bookmark = require('../models/bookmark.model');
const User = require('../models/user.model');
const { get } = require('mongoose');

// Create tags
router.post('/create', async (req, res) => {
    try {
        let { name, email, tags } = req.body;
        let user = await getUser({ name, email });
        // console.log('Found User: ', user);
        let tagsDoc = await createTags({ userId: user._id, tags });
        // console.log('TagDocs', tagsDoc);
        if (!user.tagId) {
            user.tagId = tagsDoc._id;
        }
        await user.save()
        res.status(200).send({ user, tagsDoc });
    } catch (e) {
        res.send(e);
    }
});

// Get all Tags
router.get('/get', async (req, res) => {
    try {
        let email = req.body.email;
        let user = await getUser({ email });
        let tags = await getTags({ userId: user._id })
        res.status(200).send(tags);
    } catch (e) {
        res.send(e)
    }
});

// Delete Tags
router.delete('/delete', async (req, res) => {
    try {
        let { email, tags } = req.body;
        await deleteTags({ email, tags });
        res.status(200).send();
    } catch (e) {
        res.send(e);
    }
});

// Add tag to bookmark
router.post('/add', async (req, res) => {
    try {
        let { email, link, tags } = req.body;
        let user = await getUser({ email });
        let tagsDoc = await createTags({ userId: user._id, tags });
        let bookmark = await retrieveBookmark({ userId: user._id, link });
        await addTagsToBookmark({ bookmarkId: bookmark._id, existingTags: bookmark.tags, tags, tagsDoc });
        res.status(200).send();
    } catch (e) {
        res.send(e)
    }
});

// Remove tag from bookmark
router.post('/remove', async (req, res) => {
    try {
        let { email, link, tags } = req.body;
        let user = await getUser({ email });
        await removeTagsFromBookmark({ userId: user._id, link, tags });
        res.status(200).send();
    } catch (e) {
        res.send(e);
    }
});

module.exports = router