import { AppBar, Toolbar, Grid, makeStyles, Typography} from "@material-ui/core";
import React, { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router";
import { Link } from 'react-router-dom'
import { signOut } from "../redux/auth/auth.actions";
import { RootState } from "../redux/root.reducer";
import { AuthState } from "../redux/types";

const useStyles = makeStyles(theme => ({
  root: {
    background: '#89CFF0',
    transform: 'translateZ(0)'
  },
  searchInput: {
    opacity: '0.6',
    padding: `0px ${theme.spacing(1)}px`,
    fontSize: '0.8rem',
    '&:hover': {
      backgroundColor: '#f2f2f2'
    },
    '& .MuiSvgIcon-root': {
      marginRight: theme.spacing(5)
    }
  }
}));

const Header: FC = () => {
  const history = useHistory();
  const location = useLocation();
  
  const authState: AuthState  = useSelector((state : RootState) => state.auth);
  const dispatch = useDispatch();
  const classes = useStyles();

  const handlePowerClicked = (e: any) => {
    if(authState.authenticated){
      dispatch(signOut());
    }
    if(authState.authenticated){
      history.push('/home');
    }
    else {
      history.push('/login');
    }
  } 
  const logInOutText = () => {
    return authState.authenticated ? 'Log Out' : 'Log in';
  } 
  return (
    <AppBar position="static" className={classes.root}>
      <Toolbar> 
        <Grid container alignItems='center'>
        <Grid item sm>
         
        </Grid>
          <Grid item sm></Grid>
		  <Grid item>
            { authState.authenticated===true && <Link to="/admin/quizList" style={{ textDecoration: 'none', padding: '20px', color: 'white' }}>
				Quiz List
            </Link>} 
          </Grid>
          <Grid item>
          
			<Typography style={{cursor: 'pointer'}} variant="subtitle2" component="div" onClick={handlePowerClicked}>
			{ location.pathname !== '/login' ?
				logInOutText()
				: null
			}
			</Typography>
          </Grid>
          
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
