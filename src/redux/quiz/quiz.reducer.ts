import { QuizAction, QuizState, SET_DATA, SET_ERROR, SET_LOADING } from "./quiz.types";

const quizzes = [
    {name: 'Stress Test', instructions: 'asdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasd', quizCode: '2r2q', description: 'test for aci limited'},
    {name: 'asdasdawqfa', instructions: 'aasasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasddacsdasd', quizCode: '2t2q', description: 'acawwf'},
    {name: 'Stress Test', instructions: 'asdasd', quizCode: '2r2q', description: 'test for aci limited'},
    {name: 'asdasdawqfa', instructions: 'aasdacsdasd', quizCode: '2t2q', description: 'acawwf'},
    {name: 'Stress Test', instructions: 'asdasd', quizCode: '2r2q', description: 'test for aci limited'},
    {name: 'asdasdawqfa', instructions: 'aasdacsdasd', quizCode: '2t2q', description: 'acawwf'},
    {name: 'Stress Test', instructions: 'asdasd', quizCode: '2r2q', description: 'test for aci limited'},
    {name: 'asdasdawqfa', instructions: 'aasdacsdasd', quizCode: '2t2q', description: 'acawwf'},
]
const initialState: QuizState = {
    quizzes: quizzes,
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