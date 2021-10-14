import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Avatar, Button, Paper, Grid, Typography, Container, TextField } from '@material-ui/core';
import { GoogleLogin } from 'react-google-login';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import { signup, signin } from '../../actions/auth';
import useStyles from './style.js';
import Input from './Input';
import Icon from './Icon';

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };

const Auth = () => {
	const [formData, setFormData] = useState(initialState);
	const classes = useStyles();
	const dispatch = useDispatch();
	const history = useHistory();

	const [showPassword, setShowPassword] = useState(false);
	const [isSignUp, setSignUp] = useState(true);

	const handleChange = e => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = e => {
		e.preventDefault();

		if (isSignUp) {
			dispatch(signup(formData, history));
		} else {
			dispatch(signin(formData, history));
		}
	};

	const handleShowPassword = () => setShowPassword(previousShowPassword => !previousShowPassword);

	const switchMode = () => {
		setSignUp(previusState => !previusState);
		setShowPassword(false);
	};

	const googleSuccess = async res => {
		const result = res?.profileObj;
		const token = res?.tokenId;

		try {
			dispatch({ type: 'AUTH', data: { result, token } });
			history.push('/');
		} catch (e) {}
	};

	const googleFailure = error => {
		console.log(error);
	};

	return (
		<Container component="main" maxWidth="xs">
			<Paper className={classes.paper} evaluation={3}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography variant="h5">{isSignUp ? 'Sign Up' : 'Sign In'}</Typography>
				<form className={classes.form} onSubmit={handleSubmit}>
					<Grid container spacing={2}>
						{isSignUp && (
							<>
								<Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
								<Input name="lastName" label="Last Name" handleChange={handleChange} autoFocus half />
							</>
						)}
						<Input name="email" type="email" label="Email" handleChange={handleChange} />
						<Input name="password" type={showPassword ? 'text' : 'password'} label="Password" handleChange={handleChange} handleShowPassword={handleShowPassword} />
						{isSignUp && <Input name="confirmPassword" type="password" label="Repeat Password" handleChange={handleChange} />}
					</Grid>
				</form>
				<Button type="submit" className={classes.submit} fullWidth color="secondary" variant="contained" onClick={handleSubmit}>
					{isSignUp ? 'Sign Up' : 'Sign In'}
				</Button>
				<GoogleLogin
					clientId="92463467579-egs2e6epi7gunbbg0nlbe8ppfun2epc2.apps.googleusercontent.com"
					render={renderProps => (
						<Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">
							Google Sign In
						</Button>
					)}
					onSuccess={googleSuccess}
					onFailure={googleFailure}
					cookiePolicy="single_host_origin"
				/>

				<Grid container justifyContent="flex-end">
					<Grid item>
						<Button onClick={switchMode}>{isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign Up"}</Button>
					</Grid>
				</Grid>
			</Paper>
		</Container>
	);
};

export default Auth;

// clientid 92463467579-egs2e6epi7gunbbg0nlbe8ppfun2epc2.apps.googleusercontent.com
// clientsecret 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
