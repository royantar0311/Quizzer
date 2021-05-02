import { FC, useEffect, lazy, Suspense } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from './config/firbase.config';
import Header from './components/Header'
import { CircularProgress, createMuiTheme, makeStyles,ThemeProvider } from '@material-ui/core';
import { setUser } from './redux/auth/auth.actions';
import { SIGN_OUT } from './redux/types';
import {Switch, Route, BrowserRouter as Router} from 'react-router-dom'
import Home from './screens/Home';

const QuizList = lazy(() => import ('./screens/QuizList'));
const Quiz = lazy(() => import ('./screens/Quiz'));
const Login = lazy(() => import ('./screens/Login'));
const Quizzes = lazy(() => import ('./screens/Quizzes'));

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
            <Suspense fallback={<CircularProgress />} >
              <Switch>
                  <Route exact path="/home">
                    <Home />
                  </Route>
                  <Route exact path="/">
                    <Home />
                  </Route>
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
            </Suspense>
        </div>
      </Router>
    </ThemeProvider>
    
  );
}

export default App;
