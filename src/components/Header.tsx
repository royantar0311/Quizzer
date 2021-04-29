import { AppBar, Toolbar, Grid, makeStyles, Typography} from "@material-ui/core";
import React, { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router";
import { signOut } from "../redux/auth/auth.actions";
import log from "../Util/Logger";

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
  },
  logButtonRed: {
    fill: 'red'
  },
  logButtonGreen: {
    fill: 'green'
  }
}));

const Header: FC = () => {
  const history = useHistory();
  const location = useLocation();
  // @ts-ignore
  const isAuthenticated = useSelector((state ) => state.auth.authenticated );
  const dispatch = useDispatch();
  const classes = useStyles();

  const handlePowerClicked = (e: any) => {
    if(isAuthenticated){
      dispatch(signOut());
    }
    if(isAuthenticated){
      history.push('/home');
    }
    else {
      history.push('/login');
    }
  } 
  const logInOutText = () => {
    return isAuthenticated ? 'Log Out' : 'Log in';
  } 
  return (
    <AppBar position="static" className={classes.root}>
      <Toolbar> 
        <Grid container alignItems='center'>
          <Grid item sm></Grid>
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
