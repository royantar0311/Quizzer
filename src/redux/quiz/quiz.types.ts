export const SET_LOADING = 'SET_LOADING';
export const SET_ERROR = 'SET_ERROR';
export const SET_DATA = 'SET_DATA';

export interface Quiz {
    quizCode: String,
    name: String,
    description: String,
    instructions: String
}

export interface QuizState {
    quizzes: Quiz[],
    isLoading: boolean,
    error: string
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

export type QuizAction = SetDataAction | SetLoadingAction | SetErrorAction;
