const mongoose = require('mongoose');
require('dotenv').config();

const CONNECTION_URL = process.env.CONNECTION_URL;

mongoose
	.connect(CONNECTION_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(client => console.log('db connected'))
	.catch(err => console.log(err));

// to check the connection to the db
var db = mongoose.connection;

db.once('open', function () {
	console.log('Successfully connected to MongoDB!');
});

// if connection error
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
