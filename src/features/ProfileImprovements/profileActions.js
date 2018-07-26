import { SubmissionError} from 'redux-form';
import {toastr} from 'react-redux-toastr';
import { firebase } from '../../../node_modules/react-redux-firebase';

export const addPhoto = (blob) => {


    console.log("this is the blob",blob);
    return async (dispatch, getState, {getFirebase, getFirestore}) =>{
        const firebase = getFirebase();
        const firestore = getFirestore();
       
        try {

            var storageRef = firebase.storage().ref();
            const user = firebase.auth().currentUser;
            console.log(user.uid, "current user");
            var nameRef = storageRef.child(`/profile/${user.uid}`);
            var file = blob;
            console.log(file);
           nameRef.put(file).then(function(snapshot) {
                console.log(snapshot, 'Uploaded a blob or file!');
                var snapImage = snapshot.downloadURL;
                console.log(snapImage, "is this the image URL");
            firebase.updateProfile({ displayPicture: snapImage, displayName:user.displayName })
//firebase profile displayPicture needs to be set as snapImage
 
            toastr.success('Successfully updated Profile picture!');
        })
    
     } catch (error) {
            toastr.error('Unable to update Profile picture!');
            console.log(error)
            throw new SubmissionError({
                _error: error.message
            })

        }
        

    
};
}

