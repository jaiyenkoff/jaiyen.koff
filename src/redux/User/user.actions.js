import userTypes from './user.types';
import { auth, handleUserProfile, GoogleProvider, FacebookProvider } from "./../../firebase/utils";


export const emailSignInStart = userCredentials => ({
  type: userTypes.EMAIL_SIGN_IN_START,
  payload: userCredentials
})

export const signInSuccess = user => ({
  type: userTypes.SIGN_IN_SUCCESS,
  payload: user
})

export const checkUserSession = () => ({
  type: userTypes.CHECK_USER_SESSION
})


export const signOutUserStart = () => ({
  type: userTypes.SIGN_OUT_USER_START
})

export const signOutUserSuccess = () =>({
  type: userTypes.SIGN_OUT_USER_SUCCESS
})


export const signUpUserStart = userCredentials => ({
  type: userTypes.SIGN_UP_USER_START,
  payload: userCredentials
})

export const userError = err => ({
  type: userTypes.USER_ERROR,
  payload: err
})


export const resetPasswordStart = userCredentials => ({
  type: userTypes.RESET_PASSWORD_START,
  payload: userCredentials 
})

export const resetPasswordSuccess = () => ({
  type: userTypes.RESET_PASSWORD_SUCCESS,
  payload: true
})



export const setCurrentUser = user => ({
    type: userTypes.SET_CURRENT_USER,
    payload: user
})

// export const signInUser = ({ email, password }) => async dispatch => {
// }

export const resetAllAuthForms = () => ({
  type: userTypes.RESET_AUTH_FORMS
})
 
export const signUpUser = ({ displayName, email, password, confirmPassword }) => async dispatch => {
    
}

export const resetPassword = ({ email }) => async dispatch => {
         
}

export const signInWithGoogle = () => async dispatch => {

  try {
    await auth.signInWithPopup(GoogleProvider)
      .then(() => {
        dispatch({ 
          type: userTypes.SIGN_IN_SUCCESS,
          payload: true
       });
      });
  } catch (err) {
    console.log(err);
  }
  
};


export const signInWithFacebook = () => async dispatch => {

  try {
    await auth.signInWithPopup(FacebookProvider)
      .then(() => {
        dispatch({ 
          type: userTypes.SIGN_IN_SUCCESS,
          payload: true
       });
      });
  } catch (err) {
    console.log(err);
  }
};
