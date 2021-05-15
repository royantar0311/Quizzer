import {FC, lazy} from 'react';
import {Route, Switch} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { RootState } from '../../redux/root.reducer';
import { AuthState } from '../../redux/types';
const CreateQuiz = lazy(() => import ('./CreateQuiz'));
const QuizList = lazy(() => import ('./QuizList'));
const QuizResult = lazy(() => import('./QuizResult'));

const Admin : FC = () => {
    const authState: AuthState = useSelector((state : RootState) => state.auth);
    if(authState.authenticated === false)return <Redirect to='/pagenotfound'/>;
    return (
            <Switch>
                <Route exact path="/admin/quizList">
                    <QuizList />
                </Route>
                <Route exact path="/admin/create">
                    <CreateQuiz />
                </Route> 
                <Route exact path="/admin/edit/:quizCode">
                    <CreateQuiz/>
                </Route>
                <Route exact path="/admin/result/:quizCode">
                    <QuizResult/>
                </Route>
            </Switch>
    )
}
export default Admin;