const express = require('express');
const cors = require('cors');

const postRoutes = require('./src/routes/posts');
const userRoutes = require('./src/routes/users');

require('./src/utils/db');
const app = express();

app.use(express.json({ limit: '30mb', extended: true }));
app.use(express.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());

app.use('/posts', postRoutes);
app.use('/users', userRoutes);
app.get('/', (req, res, next) => {
	res.send('Welcome to memories app');
});

module.exports = app;
