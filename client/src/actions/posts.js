import * as api from '../api';
import { CREATE, DELETE, FETCH_ALL, LIKE, UPDATE } from '../constants/actionTypes';

export const getPosts = () => async dispatch => {
	try {
		const { data } = await api.fetchPosts();
		dispatch({ type: FETCH_ALL, payload: data });
	} catch (error) {
		console.log(error);
	}
};

export const createPost = post => async dispatch => {
	try {
		const { data } = await api.createPost(post);
		console.log({ data });
		dispatch({ type: CREATE, payload: data });
	} catch (error) {
		console.log(error);
	}
};

export const updatePost = (currentId, postData) => async dispatch => {
	try {
		const { data } = await api.updatePost(currentId, postData);

		dispatch({ type: UPDATE, payload: data });
	} catch (e) {}
};

export const deletePost = postId => async dispatch => {
	try {
		await api.deletePost(postId);

		dispatch({ type: DELETE, payload: postId });
	} catch (e) {}
};

export const likePost = id => async dispatch => {
	try {
		const { data } = await api.likePost(id);
		dispatch({ type: LIKE, payload: data });
	} catch (e) {}
};
