import {AuthState, AuthAction, SET_USER, SIGN_OUT, SET_LOADING, SET_ERROR} from '../types'; 

const initialState: AuthState = {
    user: null,
    authenticated: false,
    isLoading: false,
    error: ''
}

const authReducer = (state = initialState, action: AuthAction) => {
    if(action.type === SET_USER){
        return {
            ...state, 
            user: action.payload,
            authenticated: true,
            isLoading: false
        }
    }
    else if(action.type === SIGN_OUT){
        return {
            ...state, 
            user: null,
            authenticated: false,
            isLoading: false
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

export type AuthReducer = ReturnType<typeof authReducer>;

export default authReducer;