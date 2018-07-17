import reducerLookUpFunction from './reducerLookUpFunction';
import { ADD_PRODUCT } from '../constants/productConstants';

let initialState = [];

const addProduct = (state, payload) => {
        return [
            ...state,
            payload
        ]
}


const editProduct = (state, payload) => {

}

export default reducerLookUpFunction(initialState, {
    [ADD_PRODUCT] : addProduct
})



















