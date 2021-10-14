import axios from 'axios';

// const url = 'https://memories-mern-x.herokuapp.com/posts';
const API = axios.create({ baseURL: 'http://localhost:5000' });

API.interceptors.request.use(req => {
	if (localStorage.getItem('profile')) {
		req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
	}
	return req;
});

export const fetchPosts = () => API.get('/posts');
export const createPost = newPost => API.post('/posts', newPost);
export const updatePost = (id, postData) => API.patch(`posts/${id}`, postData);
export const deletePost = id => API.delete(`posts/${id}`);
export const likePost = id => API.patch(`posts/${id}/like-post`);

export const signUp = formData => API.post(`users/signup`, formData);
export const signIn = formData => API.post(`users/signin`, formData);
