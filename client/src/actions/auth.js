import { AUTH } from '../constants/actionTypes';
import * as api from '../api';

export const signup = (formData, history) => async dispatch => {
	try {
		// signup ..
		const { data } = await api.signUp(formData);

		dispatch({ type: AUTH, data });

		history.push('/');
	} catch (error) {}
};
export const signin = (formData, history) => async dispatch => {
	try {
		// signup ..
		const { data } = await api.signIn(formData);

		dispatch({ type: AUTH, data });

		history.push('/');
	} catch (error) {}
};
