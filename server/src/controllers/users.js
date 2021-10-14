const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
	const { firstName, lastName, email, password, confirmPassword } = req.body;

	try {
		const existingUser = await User.findOne({ email });

		if (existingUser) return res.status(400).json({ message: 'This user is already exist.' });

		if (password !== confirmPassword) return res.status(400).json({ message: 'The passwords should matches' });

		const hashedPassword = await bcrypt.hash(password, 8);

		const user = User.create({ name: `${firstName} ${lastName}`, email, password: hashedPassword });

		const token = await jwt.sign({ email, id: user._id }, 'mysecret', { expiresIn: '1h' });

		res.status(201).json({ result: user, token });
	} catch (e) {
		res.status(500).json({ message: 'Something went wrong.' });
	}
};

exports.signin = async (req, res) => {
	const { email, password } = req.body;

	try {
		const user = await User.findOne({ email });

		if (!user) return res.status(400).json({ message: 'This email does not exist' });

		const isMatch = await bcrypt.compare(password, user.password);

		if (!isMatch) return res.status(404).json({ message: 'the password is incorrect' });

		const token = jwt.sign({ email, id: user._id }, 'mysecret', { expiresIn: '1h' });

		res.status(200).json({ result: user, token });
	} catch (e) {
		res.status(500).json({ message: 'Something went wrong.' });
	}
};
