import React, { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from './config/firbase.config';
import Header from './components/Header'
import { createMuiTheme, makeStyles,ThemeProvider } from '@material-ui/core';
import Login from './screens/Login';
import { setUser } from './redux/auth/auth.actions';
import { SIGN_OUT } from './redux/types';
import {Switch, Route, BrowserRouter as Router, useHistory} from 'react-router-dom'
import Quizzes from './screens/Quizzes';
import Home from './screens/Home';
import { getQuizzes } from './redux/quiz/quiz.actions';


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
    // dispatch(getQuizzes());
    const unsubscribeFromAuth = auth.onAuthStateChanged(user => {
      if(user){
        // @ts-ignore
        dispatch(setUser({email: user.email}));
        // history.push('/home');

      }else{
        dispatch({type: SIGN_OUT});
        // history.push('/login');
      }
    })
    return () => unsubscribeFromAuth();
  }, [])  ;
  
  return (
    <ThemeProvider theme={theme}>
      <Router>
      <div className={classes.appMain}>
          <Header/>

          <Switch>
          <Route exact path="/home">
              <Home />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/quizzes">
              <Quizzes />
            </Route>
            
          </Switch>
         
        
      </div>
      </Router>
    </ThemeProvider>
    
  );
}

export default App;
