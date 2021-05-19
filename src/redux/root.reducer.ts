import { combineReducers } from 'redux';
import AuthReducer from './auth/auth.reducer';
import QuizReducer from './quiz/quiz.reducer';

const rootReducer = combineReducers({
	auth: AuthReducer,
	quiz: QuizReducer,
});
export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
