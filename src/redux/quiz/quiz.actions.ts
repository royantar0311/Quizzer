import { ThunkAction } from 'redux-thunk';
import { firestore } from '../../config/firbase.config';
import log from '../../Util/Logger';
import { QuizReducer } from './quiz.reducer';
import {
	DELETE_QUIZ,
	Quiz,
	QuizAction,
	SET_DATA,
	SET_ERROR,
	SET_LOADING,
} from './quiz.types';
export const getQuizzes =
	(): ThunkAction<void, QuizReducer, null, QuizAction> => async (dispatch) => {
		try {
			const quizzes: Quiz[] = [];
			dispatch(setLoading(true));
			const querySnapshot = await firestore.collection('quizzes').get();
			querySnapshot.forEach((doc) => {
				const data = doc.data();
				quizzes.push({
					quizCode: doc.id,
					name: data.name,
					description: data.description,
					categories: data.categories,
					questions: data.questions,
					instructions: data.instructions,
				});
			});
			dispatch({
				type: SET_DATA,
				payload: quizzes,
			});
		} catch (err) {
			log('quizActions getQuizzes: ' + err);
			dispatch(setError(err.message));
		} finally {
			dispatch(setLoading(false));
		}
	};
export const setLoading =
	(value: boolean): ThunkAction<void, QuizReducer, null, QuizAction> =>
	(dispatch) => {
		dispatch({
			type: SET_LOADING,
			payload: value,
		});
	};

export const setError = (
	msg: string
): ThunkAction<void, QuizReducer, null, QuizAction> => {
	return (dispatch) => {
		dispatch({
			type: SET_ERROR,
			payload: msg,
		});
	};
};
export const deleteQuiz =
	(quiz: Quiz): ThunkAction<void, QuizReducer, null, QuizAction> =>
	(dispatch) => {
		dispatch({
			type: DELETE_QUIZ,
			payload: quiz,
		});
	};
