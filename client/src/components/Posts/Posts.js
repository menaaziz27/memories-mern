import React from 'react';

import { useSelector } from 'react-redux';
import { Grid, CircularProgress } from '@material-ui/core';

import Post from './Post/Post';
import useStyles from './style';

function Posts({ setCurrentId }) {
	const classes = useStyles();

	// to retreive data from the store
	// and watch changes that happens to the posts
	// when the state is changed the component is re-rendered
	const posts = useSelector(state => state.posts);

	return (
		<>
			{!posts.length ? (
				<CircularProgress />
			) : (
				<Grid className={classes.container} container alignItems="stretch" spacing={3}>
					{posts.map(post => (
						<Grid key={post._id} item xs={12} sm={6} md={6}>
							<Post post={post} setCurrentId={setCurrentId} />
						</Grid>
					))}
				</Grid>
			)}
			;
		</>
	);
}

export default Posts;
