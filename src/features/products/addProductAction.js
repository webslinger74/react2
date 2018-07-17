import { SubmissionError} from 'redux-form';
import {toastr} from 'react-redux-toastr';

export const addProduct = (product) => {
    return async (dispatch, getState, {getFirebase, getFirestore}) =>{
        const firestore = getFirestore();

        try {
            let newProduct = {
                price:product.price,
                title:product.title,
                description:product.description,
                createdAt:firestore.FieldValue.serverTimestamp()
            };
            await firestore.add('products/', {...newProduct});
            toastr.success('Successfully added Product');
        } catch (error) {
            toastr.error('Unable to create new product!');
            throw new SubmissionError({
                _error: error.message
            })

        }
    }
}