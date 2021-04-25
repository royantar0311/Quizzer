import { ThunkAction } from "redux-thunk";
import { AuthAction, SET_LOADING, SET_ERROR, SignInData} from "../types";
import { AuthReducer } from "./auth.reducer";
import { auth } from '../../config/firbase.config';
import log from "../../Util/Logger";


export const setUser = (value)

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

export const signIn = (data: SignInData) : ThunkAction<void, AuthReducer, null, AuthAction> => async dispatch => {
    try {
        dispatch(setLoading(true));
        await auth.signInWithEmailAndPassword(data.email, data.password);
      } catch (err) {
        log('authActions signin: ' + err);
        dispatch(setError(err.message));
      }
      finally {
        dispatch(setLoading(false));
      }
}