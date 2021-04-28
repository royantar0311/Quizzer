import { ThunkAction } from "redux-thunk";
import { AuthAction, SET_LOADING, SET_ERROR, SignInData, Admin, SET_USER } from "../types";
import { AuthReducer } from "./auth.reducer";
import { auth } from '../../config/firbase.config';
import log from "../../Util/Logger";


export const setUser = (value: Admin): ThunkAction<void, AuthReducer, null, AuthAction> => dispatch => {
	dispatch({
		type: SET_USER,
		payload: value
	});
}

export const setLoading = (value: boolean)
	: ThunkAction<void, AuthReducer, null, AuthAction> => dispatch => {
		dispatch({
			type: SET_LOADING,
			payload: value
		});
	}

export const setError = (msg: string): ThunkAction<void, AuthReducer, null, AuthAction> => {
	return dispatch => {
		dispatch({
			type: SET_ERROR,
			payload: msg
		});
	}
}

export const signIn = (data: SignInData): ThunkAction<void, AuthReducer, null, AuthAction> => async dispatch => {
	try {
		dispatch(setLoading(true));
		const result = await auth.signInWithEmailAndPassword(data.email, data.password);
		log(result);
	} catch (err) {
		log('authActions signin: ' + err);
		dispatch(setError(err.message));
	}
	finally {
		dispatch(setLoading(false));
	}
}

export const signOut = (): ThunkAction<void, AuthReducer, null, AuthAction> => async dispatch => {
	try {
		dispatch(setLoading(true));
		await auth.signOut();
	} catch (err) {
		log('authActions signOut: ' + err);
		dispatch(setError(err.message));
	}
	finally {
		dispatch(setLoading(false));
	}
}