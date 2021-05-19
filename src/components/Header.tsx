import { AppBar, Toolbar, Grid, makeStyles } from '@material-ui/core';
import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
import { NavLink } from 'react-router-dom';
import { signOut } from '../redux/auth/auth.actions';
import { RootState } from '../redux/root.reducer';
import { AuthState } from '../redux/types';

const useStyles = makeStyles((theme) => ({
	root: {
		background: '#89CFF0',
		transform: 'translateZ(0)',
	},
	searchInput: {
		opacity: '0.6',
		padding: `0px ${theme.spacing(1)}px`,
		fontSize: '0.8rem',
		'&:hover': {
			backgroundColor: '#f2f2f2',
		},
		'& .MuiSvgIcon-root': {
			marginRight: theme.spacing(5),
		},
	},
	button: {
		textDecoration: 'none',
		padding: '20px',
		color: 'white',
	},
}));

const Header: FC = () => {
	const history = useHistory();
	const location = useLocation();

	const authState: AuthState = useSelector((state: RootState) => state.auth);
	const dispatch = useDispatch();
	const classes = useStyles();

	const handleLogInOutClicked = (e: any) => {
		if (authState.authenticated) {
			dispatch(signOut());
		}
		if (authState.authenticated) {
			history.push('/home');
		} else {
			history.push('/login');
		}
	};
	const logInOutText = () => {
		return authState.authenticated ? 'Log Out' : 'Log in';
	};
	const logInOutLink = () => {
		return authState.authenticated ? '#' : '/login';
	};
	return (
		<AppBar position="static" className={classes.root}>
			<Toolbar>
				<Grid container alignItems="center">
					<Grid item sm />
					<Grid item>
						<NavLink to="/Home" className={classes.button}>
							Home
						</NavLink>
					</Grid>
					{authState.authenticated === true && (
						<>
							<Grid item>
								<NavLink to="/admin/create" className={classes.button}>
									Create Quiz
								</NavLink>
							</Grid>
							<Grid item>
								<NavLink to="/admin/quizList" className={classes.button}>
									Quiz List
								</NavLink>
							</Grid>
						</>
					)}
					<Grid item>
						<NavLink
							to={logInOutLink()}
							className={classes.button}
							onClick={handleLogInOutClicked}
						>
							{location.pathname !== '/login' ? logInOutText() : ''}
						</NavLink>
					</Grid>
				</Grid>
			</Toolbar>
		</AppBar>
	);
};

export default Header;
