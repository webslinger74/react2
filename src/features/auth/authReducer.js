import { LOGIN_USER, SIGN_OUT_USER } from './authConstants';
import reducerLookUpFunction from '../../reducers/reducerLookUpFunction';

const initialState = {
    currentUser: '',
    authenticated:false
}

export const loginUser = (state, payload) => {
       return { 
                ...state, 
                authenticated: true,
                currentUser: payload.creds.email
       }
}


export const signOutUser = (state, payload) => {
    return {
        ...state,
        authenticated: false,
        currentUser: ''
    }
}



export default reducerLookUpFunction(initialState, {
    [LOGIN_USER]:loginUser,
    [SIGN_OUT_USER]:signOutUser
})