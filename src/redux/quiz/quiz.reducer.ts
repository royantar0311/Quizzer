import { QuizAction, QuizState, SET_DATA, SET_ERROR, SET_LOADING } from "./quiz.types";


const initialState: QuizState = {
    quizzes: [],
    isLoading: false,
    error: ''
}


const quizReducer = (state = initialState, action : QuizAction) => {
    if(action.type === SET_DATA){
        return {
            ...state,
            quizzes: action.payload
        }
    }
    else if(action.type === SET_LOADING){
        return {
            ...state,
            isLoading: action.payload,
        }
    }
    else if(action.type === SET_ERROR){
        return {
            ...state,
            error: action.payload
        }
    }
    return state;
}

export type QuizReducer = ReturnType<typeof quizReducer>;

export default quizReducer;