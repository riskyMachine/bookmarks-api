const User = require("../models/user.model");

async function getUser({ name, email }) {
	let user = await User.findOne({ email });
	if (user) {
		return user;
	} else {
		user = new User({ name, email });
		await user.save();
		return user;
	}
}

module.exports = { getUser };
