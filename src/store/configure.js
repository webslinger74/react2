import { createStore, applyMiddleware, combineReducers } from 'redux';
import productReducer from '../reducers/productReducer';
import filterReducer from '../reducers/filterReducer';
import modalsReducer from '../features/modals/modalReducer';
import { reactReduxFirebase, getFirebase, firebaseReducer } from 'react-redux-firebase';
import { reduxFirestore, getFirestore, firestoreReducer } from 'redux-firestore';
import thunk from 'redux-thunk';
import authReducer from '../features/auth/authReducer';
import { reducer as FormReducer } from 'redux-form';
import { composeWithDevTools } from 'redux-devtools-extension';
import firebase from '../firebase/firebase';
import { reducer as toastrReducer} from 'react-redux-toastr';

const rrfConfig = {
    userProfile: 'users',
    attachAuthIsReady: true,
    useFirestoreForProfile:true
}


 export const configureStore = (preloadedState) => {
    const middlewares = [thunk.withExtraArgument({ getFirebase, getFirestore })];
    const middlewareEnhancer = applyMiddleware(...middlewares);
    const storeEnhancer = [middlewareEnhancer];

    const composedEnhancer = composeWithDevTools(...storeEnhancer,
        reactReduxFirebase(firebase, rrfConfig),
    reduxFirestore(firebase));


const store = createStore(
    combineReducers({
        firebase:firebaseReducer,
        firestore:firestoreReducer,
        Products: productReducer,
        Filters: filterReducer,
        Modals:modalsReducer,
        auth: authReducer,
        form: FormReducer,
        toastr: toastrReducer

    }), 
    preloadedState,
    composedEnhancer
)
    return store;
}



