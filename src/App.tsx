import { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from './config/firbase.config';
import Header from './components/Header'
import { createMuiTheme, makeStyles,ThemeProvider } from '@material-ui/core';
import Login from './screens/Login';
import { setUser } from './redux/auth/auth.actions';
import { SIGN_OUT } from './redux/types';
import {Switch, Route, BrowserRouter as Router} from 'react-router-dom'
import Quizzes from './screens/Quizzes';
import Home from './screens/Home';
import Quiz from './screens/Quiz';
import QuizList from './screens/QuizList';

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
        dispatch(setUser({email: user.email!}));
      }else{
        dispatch({type: SIGN_OUT});
      }
    })
    return () => unsubscribeFromAuth();
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
                <Route exact path="/quiz/:quizCode">
                  <Quiz />
                </Route>
                <Route exact path="/admin/quizlist">
                  <QuizList />
                </Route>
            </Switch>
        </div>
      </Router>
    </ThemeProvider>
    
  );
}

export default App;
