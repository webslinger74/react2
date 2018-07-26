
import { SubmissionError} from 'redux-form';
import { modalClose } from '../modals/modalActions';

export const loginUser = (creds) => {
    return async (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();
        try {
            await firebase.auth().signInWithEmailAndPassword(creds.email, creds.password);
            dispatch(modalClose());
        } catch (error){
            console.log(error);
            throw new SubmissionError({
                _error: error.message
            })
        }
    }
};


export const registerUser = (user) =>
async (dispatch, getState, {getFirebase, getFirestore}) => {
    const firebase = getFirebase();
    const firestore = getFirestore();

    try {
        //create the user in firebase.auth
        let createdUser = await firebase.auth()
        .createUserWithEmailAndPassword(user.email, user.password);
        console.log(createdUser);
        //update the auth profile with displayname
        await createdUser.updateProfile({
            displayName: user.displayName,
            displayPicture:{}
        })
        //create new user as a profile for viewing in firestore as opposed to any auth info
        let newUser = {
            displayName:user.displayName,
            createdAt:firestore.FieldValue.serverTimestamp(),
            displayPicture:{}
        };
        await firestore.set(`users/${createdUser.uid}`, {...newUser});
        dispatch(modalClose());

    } catch (error) {
        console.log(error);
        throw new SubmissionError({
            _error: error.message
        })
    }
}
  

