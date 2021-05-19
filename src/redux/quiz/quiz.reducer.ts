import {
	DELETE_QUIZ,
	Quiz,
	QuizAction,
	QuizState,
	SET_DATA,
	SET_ERROR,
	SET_LOADING,
} from './quiz.types';

const quizzes: Quiz[] = [
	{
		name: 'Stress Test',
		categories: ['1', '2'],
		questions: [],
		instructions: 'asdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasd',
		quizCode: 'a3wg',
		description: 'test for aci limited',
	},
	{
		name: 'asdasdawqfa',
		categories: ['1', '2'],
		questions: [],
		instructions:
			'aasasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasddacsdasd',
		quizCode: 'g334',
		description: 'acawwf',
	},
	{
		name: 'Stress Test',
		categories: ['1', '2'],
		questions: [],
		instructions: 'asdasd',
		quizCode: 'abce',
		description: 'test for aci limited',
	},
	{
		name: 'asdasdawqfa',
		categories: ['1', '2'],
		questions: [],
		instructions: 'aasdacsdasd',
		quizCode: 'waf3',
		description: 'acawwf',
	},
	{
		name: 'Stress Test',
		categories: ['1', '2'],
		questions: [],
		instructions: 'asdasd',
		quizCode: '3gwe',
		description: 'test for aci limited',
	},
	{
		name: 'asdasdawqfa',
		categories: ['1', '2'],
		questions: [],
		instructions: 'aasdacsdasd',
		quizCode: '43gw',
		description: 'acawwf',
	},
	{
		name: 'Stress Test',
		categories: ['1', '2'],
		questions: [],
		instructions: 'asdasd',
		quizCode: 'aw3f',
		description: 'test for aci limited',
	},
	{
		name: 'asdasdawqfa',
		categories: ['1', '2'],
		questions: [],
		instructions: 'aasdacsdasd',
		quizCode: 'ge3a',
		description: 'acawwf',
	},
];
const initialState: QuizState = {
	quizzes: quizzes,
	isLoading: false,
	error: '',
};

const quizReducer = (state = initialState, action: QuizAction) => {
	if (action.type === SET_DATA) {
		return {
			...state,
			quizzes: action.payload,
		};
	} else if (action.type === SET_LOADING) {
		return {
			...state,
			isLoading: action.payload,
		};
	} else if (action.type === SET_ERROR) {
		return {
			...state,
			error: action.payload,
		};
	} else if (action.type === DELETE_QUIZ) {
		const newState: Quiz[] = [];
		for (let i = 0; i < state.quizzes.length; i++) {
			if (state.quizzes[i].quizCode !== action.payload.quizCode) {
				newState.push(state.quizzes[i]);
			}
		}
		return {
			...state,
			quizzes: state.quizzes.filter(
				(quiz: Quiz) => quiz.quizCode !== action.payload.quizCode
			), //action.payload
		};
	}
	return state;
};

export type QuizReducer = ReturnType<typeof quizReducer>;

export default quizReducer;
