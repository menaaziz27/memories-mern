const mongoose = require('mongoose');
const Post = require('../models/Post');

exports.getPosts = async (req, res) => {
	try {
		const posts = await Post.find({});
		res.status(200).send(posts);
	} catch (e) {
		res.status(400).send({ message: e.message });
	}
};
exports.createPost = async (req, res) => {
	const postData = req.body;
	const newPost = new Post({ ...postData, creator: req.userId, createdAt: new Date().toISOString() });
	try {
		await newPost.save();
		res.status(200).json(newPost);
	} catch (e) {
		res.status(400).send({ message: e.message });
	}
};

exports.updatePost = async (req, res) => {
	const { id } = req.params;
	const data = req.body;

	if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send();

	try {
		const updatedPost = await Post.findByIdAndUpdate(id, data, { new: true });

		res.json(updatedPost);
	} catch (e) {
		res.status(500).send(e);
	}
};

exports.deletePost = async (req, res) => {
	const postId = req.params.id;

	try {
		await Post.findByIdAndDelete(postId);
		res.status(200).json({ message: 'Post deleted' });
	} catch (e) {
		res.status(500).send(e);
	}
};

exports.likePost = async (req, res) => {
	const { id } = req.params;
	try {
		const post = await Post.findById(id);

		// this route is authorized
		// to reach here you should have req.userId
		const index = post.likes.findIndex(id => id === String(req.userId));

		if (index === -1) {
			// the user didn't like it yet
			// like logic
			post.likes.push(req.userId);
		} else {
			// dislike logic
			post.likes = post.likes.filter(id => id !== String(req.userId));
		}

		const updatedPost = await Post.findByIdAndUpdate(id, post, { new: true });

		res.json(updatedPost);
	} catch (e) {
		return res.status(500).json({ message: 'Something went wrong.' });
	}
};
