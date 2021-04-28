import { AppBar, Toolbar, Grid, IconButton, makeStyles} from "@material-ui/core";
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import React, { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
  // @ts-ignore
  const isAuthenticated = useSelector((state ) => state.auth.authenticated );
  const dispatch = useDispatch();
  const classes = useStyles();
  useEffect(() => {
  
  }, [isAuthenticated])

  const handlePowerClicked = (e: any) => {
    e.preventDefault();
    if(isAuthenticated){
      log('here');
      dispatch(signOut());
    }
  }

  return (
    <AppBar position="static" className={classes.root}>
      <Toolbar> 
        <Grid container alignItems='center'>
          <Grid item sm></Grid>
          <Grid item>
              <IconButton onClick={handlePowerClicked}>
                <PowerSettingsNewIcon style={{fill: isAuthenticated?'red':'green'}} fontSize="small"/>
              </IconButton>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
