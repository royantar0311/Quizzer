import { FC, useEffect, lazy, Suspense } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from './config/firbase.config';
import Header from './components/Header'
import { createMuiTheme, makeStyles,ThemeProvider } from '@material-ui/core';
import { setUser } from './redux/auth/auth.actions';
import { SIGN_OUT } from './redux/types';
import {Switch, Route} from 'react-router-dom'
import Loader from './components/useLoader';

const Quiz = lazy(() => import ('./screens/Quiz'));
const Login = lazy(() => import ('./screens/Login'));
const Admin = lazy(() => import ('./screens/Admin/'));
const Home = lazy(() => import ('./screens/Home'));
const PageNotFound = lazy(() => import ('./screens/PageNotFound'));
const CreateQuiz = lazy(() => import ('./screens/Admin/CreateQuiz'));

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
        <div className={classes.appMain}>
            <Header/>
            <Suspense fallback={<Loader />} >
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
                  <Route exact path="/quiz/:quizCode">
                    <Quiz />
                  </Route>
                  <Route path="/admin">
                    <Admin />
                  </Route>
                  <Route path="/pagenotfound">
                    <PageNotFound />
                  </Route>
                  <Route path="/createquiz">
                    <CreateQuiz />
                  </Route>
              </Switch> 
            </Suspense>
        </div>
    </ThemeProvider>
    
  );
}

export default App;
