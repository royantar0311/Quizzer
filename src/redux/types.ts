export const SET_USER = 'SET_USER';
export const SIGN_OUT = 'SIGN_OUT';
export const SET_LOADING = 'SET_LOADING';
export const SET_ERROR = 'SET_ERROR';

export interface Admin {
    email: string;
}

export interface AuthState {
    user: null | Admin;
    authenticated: boolean;
    isLoading: boolean;
    error: string;
}

export interface SignInData {
    email: string;
    password: string;
}

interface SetUserAction {
    type: typeof SET_USER;
    payload: Admin;
}

interface SetLoadingAction {
    type: typeof SET_LOADING;
    payload: boolean;
}

interface SignOutAction {
    type: typeof SIGN_OUT;
}

interface SetErrorAction {
    type: typeof SET_ERROR;
    payload: string;
}

export type AuthAction = SetUserAction | SetLoadingAction | SignOutAction | SetErrorAction;
