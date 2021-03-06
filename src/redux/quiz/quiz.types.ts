export const SET_LOADING = 'SET_LOADING';
export const SET_ERROR = 'SET_ERROR';
export const SET_DATA = 'SET_DATA';
export const DELETE_QUIZ = 'DELETE_QUIZ';

export interface Quiz {
	quizCode: string;
	name: string;
	categories: string[];
	description: string;
	instructions: string;
	questions: Question[];
}

export interface QuizState {
	quizzes: Quiz[];
	isLoading: boolean;
	error: string;
}

export interface Question {
	id: string;
	questionText: string;
	weights: string;
	emotions: string;
	imageLink: string;
	category: string;
	options: string;
}

interface SetDataAction {
	type: typeof SET_DATA;
	payload: Quiz[];
}

interface SetLoadingAction {
	type: typeof SET_LOADING;
	payload: boolean;
}

interface SetErrorAction {
	type: typeof SET_ERROR;
	payload: string;
}

interface DeleteQuizAction {
	type: typeof DELETE_QUIZ;
	payload: {
		quizCode: string;
	};
}

export type QuizAction =
	| SetDataAction
	| SetLoadingAction
	| SetErrorAction
	| DeleteQuizAction;
