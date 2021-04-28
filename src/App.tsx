import React, { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from './config/firbase.config';
import Header from './components/Header'
import { createMuiTheme, makeStyles,ThemeProvider } from '@material-ui/core';
import Login from './screens/Login';
import { setUser } from './redux/auth/auth.actions';
import { SIGN_OUT } from './redux/types';


const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#185392',
    },
    secondary: {
      main: '#89CFF0',
      light: '#C4E0FC'
    },
    background: {
      default: '#EFEFEF'
    }
  }
})


const useStyles = makeStyles({
  appMain: {
    padding: "0",
    margin: "0"
  }
});

const App : FC = () => {

  const classes = useStyles();

  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribeFromAuth = auth.onAuthStateChanged(user => {
      if(user){
        // @ts-ignore
        dispatch(setUser({email: user.email}));
      }else{
        dispatch({type: SIGN_OUT});
      }
    })
    return () => unsubscribeFromAuth();
  }, [])  ;
  
  return (
    <ThemeProvider theme={theme}>
      <div className={classes.appMain}>
        <Header/>
        <Login/>
      </div>
    </ThemeProvider>
    
  );
}

export default App;
