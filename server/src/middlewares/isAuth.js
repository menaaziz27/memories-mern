const jwt = require('jsonwebtoken');

exports.isAuth = async (req, res, next) => {
	try {
		const token = req.headers?.authorization?.split(' ')[1];
		if (!token) return next(new Error('Unauthorized!'));

		const isCustomAuth = token?.length < 500;

		let decodedData;
		if (token && isCustomAuth) {
			decodedData = jwt.verify(token, 'mysecret');
			req.userId = decodedData?.id;
		} else {
			decodedData = jwt.decode(token);

			req.userId = decodedData?.sub;
		}

		return next();
	} catch (e) {
		console.log(e);
	}
};
